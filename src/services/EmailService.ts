import { SendEmailInput } from './../models/SendEmailInput';
const nodemailer = require('nodemailer');

export class EmailService {
  static async sendEmail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  }: SendEmailInput) {
    console.log('send email');
    console.log(process.env.EMAIL_SMTP_HOST);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: process.env.EMAIL_SMTP_HOST_PORT,
      secure: true,
      secureConnection: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
      attachments,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.log('email err');
      console.log(err);
      return err;
    }
  }
}
