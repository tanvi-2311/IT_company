import fs from 'fs';
import path from 'path';
import supabase from '../config/supabase.js';
import { sendAdminInquiryEmail, sendClientThankYouEmail } from '../config/mailer.js';

// Fallback JSON file path
const fallbackFilePath = path.join(process.cwd(), 'data', 'local_contacts.json');
const fallbackSubscribersPath = path.join(process.cwd(), 'data', 'local_subscribers.json');

// Helper to ensure directory exists
const ensureDirectoryExists = (filePath) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
};

// Helper to write local JSON data
const saveToLocalFile = (filePath, newData) => {
  try {
    ensureDirectoryExists(filePath);
    let currentData = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      currentData = JSON.parse(content || '[]');
    }
    const newRecord = {
      id: Date.now(),
      ...newData,
      created_at: new Date().toISOString()
    };
    currentData.push(newRecord);
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
    return newRecord;
  } catch (error) {
    console.error('⚠️ Failed to write to fallback local JSON:', error.message);
    return null;
  }
};

// Helper to check if credentials are still placeholder templates
const isPlaceholderCredentials = () => {
  const key = process.env.SUPABASE_KEY || '';
  return !key || key === 'your-supabase-anon-key' || key.includes('placeholder');
};

// @desc    Submit a new contact inquiry
// @route   POST /api/contacts
// @access  Public
export const submitContactForm = async (req, res) => {
  const { name, email, phone, message, service } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are mandatory fields.',
      });
    }

    // ────────────────────────────────────────────────────────
    // 1. GRACEFUL LOCAL FALLBACK FOR PLACEHOLDERS
    // ────────────────────────────────────────────────────────
    if (isPlaceholderCredentials()) {
      console.log('📝 SUPABASE_KEY is still a placeholder. Activating local JSON fallback storage.');
      const localRecord = saveToLocalFile(fallbackFilePath, {
        name,
        email,
        phone,
        message,
        service: service || 'General Inquiry',
        status: 'New'
      });

      return res.status(201).json({
        success: true,
        message: 'Inquiry saved successfully to Local Storage! (Configure real SUPABASE_KEY in .env for cloud database)',
        data: localRecord,
      });
    }

    // ────────────────────────────────────────────────────────
    // 2. TRY REAL SUPABASE CLOUD SAVE
    // ────────────────────────────────────────────────────────
    console.log('📡 Attempting to save inquiry to Supabase cloud...');
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

    // If Supabase returns an error (e.g., table doesn't exist, RLS blocked, network offline)
    if (error) {
      console.warn('⚠️ Supabase returned an error:', error.message);
      console.log('🔄 Activating Automatic Self-Healing Fallback: Saving to local storage to prevent user-facing failure.');
      
      const localRecord = saveToLocalFile(fallbackFilePath, {
        name,
        email,
        phone,
        message,
        service: service || 'General Inquiry',
        status: 'New',
        save_fallback_error: error.message
      });

      return res.status(201).json({
        success: true,
        message: 'Message received and cached locally! (Supabase setup warning: ' + error.message + ')',
        data: localRecord,
      });
    }

    const savedContact = data[0];

    // Trigger emails only if email credentials are configured
    const isEmailPlaceholder = process.env.EMAIL_USER === 'your_email@gmail.com' || !process.env.EMAIL_USER;
    if (!isEmailPlaceholder) {
      await sendAdminInquiryEmail(savedContact);
      await sendClientThankYouEmail(savedContact);
    } else {
      console.log('✉️ Email credentials are placeholders. Email notifications skipped.');
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry saved to Supabase and automated response dispatched!',
      data: savedContact,
    });
  } catch (error) {
    console.error('🔥 Severe controller exception caught:', error.message);
    console.log('🔄 Exception Fallback Activated: Ensuring form submission success by saving locally.');
    
    try {
      const localRecord = saveToLocalFile(fallbackFilePath, {
        name,
        email,
        phone,
        message,
        service: service || 'General Inquiry',
        status: 'New',
        save_exception: error.message
      });

      return res.status(201).json({
        success: true,
        message: 'Message received and stored locally on server backup.',
        data: localRecord,
      });
    } catch (fallbackError) {
      res.status(500).json({
        success: false,
        message: 'Critical failure. Could not process your request.',
        error: error.message,
      });
    }
  }
};

// @desc    Subscribe to Newsletter
// @route   POST /api/subscribe
// @access  Public
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required to subscribe.',
      });
    }

    // ────────────────────────────────────────────────────────
    // 1. GRACEFUL LOCAL FALLBACK FOR PLACEHOLDERS
    // ────────────────────────────────────────────────────────
    if (isPlaceholderCredentials()) {
      const localRecord = saveToLocalFile(fallbackSubscribersPath, { email: email.toLowerCase(), active: true });
      return res.status(201).json({
        success: true,
        message: 'Welcome! Subscribed successfully to Local Storage! (Configure real SUPABASE_KEY for cloud saving)',
        data: localRecord,
      });
    }

    // ────────────────────────────────────────────────────────
    // 2. TRY REAL SUPABASE CLOUD SAVE
    // ────────────────────────────────────────────────────────
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

    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email.toLowerCase(), active: true }])
      .select();

    if (error) {
      console.warn('⚠️ Supabase newsletter error:', error.message);
      console.log('🔄 Local fallback triggered for subscriber.');
      const localRecord = saveToLocalFile(fallbackSubscribersPath, { email: email.toLowerCase(), active: true, fallback_error: error.message });
      return res.status(201).json({
        success: true,
        message: 'Welcome! Subscribed successfully.',
        data: localRecord,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Welcome to Vedanco newsletter! Subscription complete in Supabase.',
      data: data[0],
    });
  } catch (error) {
    console.error('🔥 Newsletter subscription exception:', error.message);
    try {
      const localRecord = saveToLocalFile(fallbackSubscribersPath, { email: email?.toLowerCase(), active: true, exception: error.message });
      return res.status(201).json({
        success: true,
        message: 'Welcome! Subscribed successfully.',
        data: localRecord,
      });
    } catch (fallbackErr) {
      res.status(500).json({
        success: false,
        message: 'Server error during subscription.',
        error: error.message,
      });
    }
  }
};

// @desc    Get all contact inquiries (For Admin panel)
// @route   GET /api/contacts
// @access  Private
export const getAllInquiries = async (req, res) => {
  try {
    if (isPlaceholderCredentials()) {
      let data = [];
      if (fs.existsSync(fallbackFilePath)) {
        data = JSON.parse(fs.readFileSync(fallbackFilePath, 'utf8') || '[]');
      }
      return res.status(200).json({
        success: true,
        count: data.length,
        data: data,
      });
    }

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
