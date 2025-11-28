const mailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
};

const transport = mailer.createTransport(nodemailerConfig);

const emailSend = async (data) => {
  const email = { ...data, from: META_EMAIL };
  try {
    console.log("start send");

    await transport.sendMail(email);
    console.log("send email");
  } catch (e) {
    console.log(e);
  }
  return true;
};

module.exports = emailSend;
