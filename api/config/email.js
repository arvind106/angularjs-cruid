const config = require("../config/config");
const nodemailer = require("nodemailer");
module.exports= nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_POST,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.SMTP_USERNAME, // generated ethereal user
        pass: config.SMTP_PASSWORD, // generated ethereal password
    },
});