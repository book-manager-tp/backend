const nodemailer = require('nodemailer');

class EmailUtil {
  constructor() {
    const emailPort = parseInt(process.env.EMAIL_PORT || '587');
    const isSecure = emailPort === 465;

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: emailPort,
      secure: isSecure, // true para 465, false para 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      family: 4, // FORZAR IPv4 (Railway tiene problemas con IPv6)
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 10000, // 10 segundos timeout de conexión
      greetingTimeout: 10000, // 10 segundos timeout de saludo
      socketTimeout: 15000, // 15 segundos timeout de socket
      pool: true, // Usar pool de conexiones
      maxConnections: 5,
      maxMessages: 100,
      logger: process.env.NODE_ENV !== 'production', // Log en desarrollo
      debug: process.env.NODE_ENV !== 'production', // Debug en desarrollo
    });

    // Verificar conexión al iniciar
    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('Email server connection verified');
    } catch (error) {
      console.error('Email server connection failed:', error.message);
      console.error('Email config:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        secure: parseInt(process.env.EMAIL_PORT || '587') === 465
      });
    }
  }

  // Enviar email de verificacion
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
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
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}, info.messageId: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Error sending verification email:', {
        error: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
      });
      throw new Error('Failed to send verification email');
    }
  }

  // Enviar email de reset de password
  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
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
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Password reset email sent to ${email}, info.messageId: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Error sending password reset email:', {
        error: error.message,
        code: error.code,
        command: error.command,
      });
      throw new Error('Failed to send password reset email');
    }
  }

  // Enviar email generico
  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}, info.messageId: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('Error sending email:', {
        error: error.message,
        code: error.code,
      });
      throw new Error('Failed to send email');
    }
  }
}

module.exports = new EmailUtil();