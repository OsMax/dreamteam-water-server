const mailer = require("nodemailer");
const { Resend } = require("resend");

require("dotenv").config();

// const { META_PASSWORD, META_EMAIL } = process.env;

const resend = new Resend(process.env.RESEND_API_KEY);

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: META_EMAIL,
//     pass: META_PASSWORD,
//   },
//   tls: { rejectUnauthorized: false },
// };

// const transport = mailer.createTransport(nodemailerConfig);
const emailSend = async (data) => {
  const email = { ...data };
  try {
    console.log("start send");

    // await transport.sendMail(email);
    await resend.emails.send(email);
    console.log("send email");
  } catch (e) {
    console.log(e);
  }
  return true;
};

module.exports = emailSend;
