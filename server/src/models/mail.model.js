const nodemailer = require('nodemailer');
const mailConfig = require('../configs/mail.config');

const sendMail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: mailConfig.service,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
        }
    });

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;