const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailer_config')


const sendMail = async ({to, subject, html}) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Top Commerce" <steve@topcommerce.com>',
    to,
    subject,
    html,
  });
}

module.exports = sendMail