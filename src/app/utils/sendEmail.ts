import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'sobuz.info0298@gmail.com',
      pass: 'segs ulkw izah htlw',
    },
  });
  await transporter.sendMail({
    from: 'sobuz.info0298@gmail.com', // sender address
    to,
    subject: 'Reset your password wihin 10 minits', // Subject line
    text: '', // plain text body
    html,
  });
};
