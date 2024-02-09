const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "airfly119@gmail.com",
    pass: "mzam umfn ksgc ugrb",
  },
})

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "airfly119@gmail.com",
    to: to,
    subject: subject,
    text: text,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendEmail }

