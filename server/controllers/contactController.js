import supabase from '../config/supabase.js';
import { sendAdminInquiryEmail, sendClientThankYouEmail } from '../config/mailer.js';

// @desc    Submit a new contact inquiry
// @route   POST /api/contacts
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message, service } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are mandatory fields.',
      });
    }

    // Insert lead into Supabase 'contacts' table
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          message,
          service: service || 'General Inquiry',
          status: 'New'
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    const savedContact = data[0];

    // Trigger asynchronous emails
    await sendAdminInquiryEmail(savedContact);
    await sendClientThankYouEmail(savedContact);

    res.status(201).json({
      success: true,
      message: 'Inquiry saved to Supabase and automated response dispatched!',
      data: savedContact,
    });
  } catch (error) {
    console.error('❌ Supabase contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing your inquiry via Supabase.',
      error: error.message,
    });
  }
};

// @desc    Subscribe to Newsletter
// @route   POST /api/subscribe
// @access  Public
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required to subscribe.',
      });
    }

    // Check if subscriber email already exists in Supabase 'subscribers' table
    const { data: existing, error: findError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (findError) {
      throw findError;
    }

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You are already subscribed to our newsletter!',
      });
    }

    // Insert new subscriber email into Supabase
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email.toLowerCase(), active: true }])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Welcome to Vedanco newsletter! Subscription complete in Supabase.',
      data: data[0],
    });
  } catch (error) {
    console.error('❌ Supabase newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription.',
      error: error.message,
    });
  }
};

// @desc    Get all contact inquiries (For Admin panel)
// @route   GET /api/contacts
// @access  Private
export const getAllInquiries = async (req, res) => {
  try {
    // Retrieve all inquiries from Supabase sorted by newest first
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.error('❌ Supabase fetch inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries from Supabase.',
      error: error.message,
    });
  }
};
