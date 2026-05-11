import nodemailer from 'nodemailer';

// Configure SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: parseInt(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send beautiful notification email to Agency admin
export const sendAdminInquiryEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h2 style="color: #123C24; text-align: center; border-bottom: 2px solid #123C24; padding-bottom: 10px;">New Inquiry Received — Vedanco</h2>
        <p style="font-size: 16px; color: #334155;">Hello Team,</p>
        <p style="font-size: 15px; color: #334155; line-height: 1.5;">A new request has been submitted on the website. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #475569;">Full Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${contactData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #475569;">E-mail:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #475569;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${contactData.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #475569;">Selected Service:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #123C24; font-weight: bold;">${contactData.service}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #475569; vertical-align: top;">Message:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a; line-height: 1.5;">${contactData.message}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 25px;">
          <a href="mailto:${contactData.email}" style="background-color: #123C24; color: #ffffff; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Reply Directly</a>
        </div>
        
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">Vedanco Corporate Portal • Automatic System Notification</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Vedanco Website Gateway" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || 'info@vedanco.com',
      subject: `🚨 [New Project Inquiry]: ${contactData.service} — ${contactData.name}`,
      html: htmlContent,
    });
    console.log(`✉️ Notification email sent to admin: ${process.env.EMAIL_RECEIVER}`);
  } catch (error) {
    console.error('⚠️ Nodemailer failed to send admin notification email:', error.message);
  }
};

// Send automated premium confirmation thank you email to Client
export const sendClientThankYouEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #123C24; margin: 0;">Vedanco</h1>
          <p style="color: #cbb490; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Rooted Here. Rising Worldwide.</p>
        </div>
        
        <h2 style="color: #0f172a; text-align: center; font-size: 20px;">Thank You for Reaching Out, ${contactData.name}!</h2>
        
        <p style="font-size: 15px; color: #475569; line-height: 1.6;">We have received your inquiry regarding <strong>${contactData.service}</strong>. Our business development team and tech architects are reviewing your requirements as we speak.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #123C24; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h4 style="margin: 0 0 8px 0; color: #123C24;">What happens next?</h4>
          <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.6;">
            <li>One of our experts will contact you within <strong>12-24 hours</strong>.</li>
            <li>We'll schedule a brief discovery call to discuss your goals.</li>
            <li>You will receive a detailed project proposal & NDA agreement.</li>
          </ol>
        </div>
        
        <p style="font-size: 15px; color: #475569; line-height: 1.6;">If you have any extra documents or files to share, feel free to reply directly to this email.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="margin: 0; font-weight: bold; color: #123C24;">Vedanco Team</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">Enterprise Software Development Specialists</p>
        </div>
        
        <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 25px;">
          © ${new Date().getFullYear()} Vedanco. All rights reserved.<br>
          We sign strict NDAs for all projects to guarantee confidentiality.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Vedanco Experts" <${process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: `✨ Thank you for contacting Vedanco — We're on it!`,
      html: htmlContent,
    });
    console.log(`✉️ Thank-you email automatically dispatched to client: ${contactData.email}`);
  } catch (error) {
    console.error('⚠️ Nodemailer failed to send client thank-you email:', error.message);
  }
};
