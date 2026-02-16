const sgMail = require('@sendgrid/mail');

class EmailUtil {
  constructor() {
    // Configurar SendGrid con la API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid initialized');
  }

  // Enviar email de verificacion
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM, // Debe estar verificado en SendGrid
      subject: 'Verify your email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Thank you for registering! Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          ">Verify Email</a>
          <p>Or copy and paste this link in your browser:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `,
    };

    try {
      const response = await sgMail.send(msg);
      console.log(`Verification email sent to ${email}, messageId: ${response[0].headers['x-message-id']}`);
      return response;
    } catch (error) {
      console.error('Error sending verification email:', {
        error: error.message,
        code: error.code,
        response: error.response?.body
      });
      throw new Error('Failed to send verification email');
    }
  }

  // Enviar email de reset de password
  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset</h2>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #dc3545;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          ">Reset Password</a>
          <p>Or copy and paste this link in your browser:</p>
          <p>${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
      `,
    };

    try {
      const response = await sgMail.send(msg);
      console.log(`Password reset email sent to ${email}, messageId: ${response[0].headers['x-message-id']}`);
      return response;
    } catch (error) {
      console.error('Error sending password reset email:', {
        error: error.message,
        code: error.code,
        response: error.response?.body
      });
      throw new Error('Failed to send password reset email');
    }
  }

  // Enviar email generico
  async sendEmail(to, subject, html) {
    const msg = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    };

    try {
      const response = await sgMail.send(msg);
      console.log(`Email sent to ${to}, messageId: ${response[0].headers['x-message-id']}`);
      return response;
    } catch (error) {
      console.error('Error sending email:', {
        error: error.message,
        code: error.code,
        response: error.response?.body
      });
      throw new Error('Failed to send email');
    }
  }
}

module.exports = new EmailUtil();