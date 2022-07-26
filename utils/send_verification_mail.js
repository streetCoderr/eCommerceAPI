
const sendMail = require("./send_email")

const sendVerificationMail = async ({name, verificationToken, email, origin}) => {
  // In production, this should change to the route specicfied by the frontend
  const verifyLink = `${origin}/api/v1/auth/verify-email?token=${verificationToken}&email=${email}`;

  const html = `<h4>Hello, ${name}</h4>,
  <p>Please verify your email by clicking on the following link: <a href="${verifyLink}">Verify Email</a></p>`;

  return sendMail({
    to: email, 
    subject: "Email Verification",
    html,
  })
}

module.exports = sendVerificationMail