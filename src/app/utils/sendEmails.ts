import nodemailer from 'nodemailer';
import config from '../config';
// to: string, html: string
export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.nodeEnv === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'md.nazimuddinaj@gmail.com',
      pass: 'jwcv djxe wtdm rxtd',
    },
  });

  await transporter.sendMail({
    from: 'md.nazimuddinaj@gmail.com', // sender address
    to: 'nazim1971.dev@gmail.com' , // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'Hello what"s up', // plain text body
     html: "<b> Hello body </b>" , // html body
  });
};