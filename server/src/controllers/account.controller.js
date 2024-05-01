const AccountModel = require('../models/account.model');
const sendMail = require('../models/mail.model');
const MailOptions = require('../utils/mailOptions.utils');
const mailConfig = require('../configs/mail.config')

class AccountController {
    static registerAccount(req, res) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const newAccount = new AccountModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: new Date(), // Đặt giá trị thời gian hiện tại cho trường created_at
            //email_verified: false, // Giả sử tài khoản mới chưa được xác minh email
            role: req.body.role, // Chưa rõ role được truyền từ đâu, bạn có thể sửa lại nếu cần thiết
            name: req.body.name
        });

        AccountModel.registerAccount(newAccount, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the account."
                });
            } else {
                sendMail(MailOptions.registrationSuccess(newAccount.name, mailConfig.user, newAccount.email));
                res.send(data);
            }
        });
    }

    static login(req, res) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const account = {
            username: req.body.username,
            password: req.body.password
        }

        AccountModel.login(account, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while logging in."
                });
            } else {
                res.send(data);
            }
        });
    }
}

module.exports = AccountController;
