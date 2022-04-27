const nodemailer = require("nodemailer");

module.exports = async ({ from, to, subject, text, html }) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.Mail_USER,
                pass: process.env.Mail_PASS,
            }
        })
        console.log("transporter ===> ", transporter)
        let info = await transporter.sendMail({
            from: `File shareing <${from}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        })
        console.log("info =>", info)
    } catch (error) {
        console.error("error => ", error)
    }
}
