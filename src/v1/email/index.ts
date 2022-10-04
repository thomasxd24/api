import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.utbm.fr',
  port: Number(process.env.SMTP_PORT) || 465,
  secure:  process.env.SMTP_SECURE.toLowerCase() === 'true',
  requireTLS: process.env.SMTP_TLS.toLowerCase() === 'true',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const SENDER_EMAIL = 'ae-noreply@utbm.fr';
