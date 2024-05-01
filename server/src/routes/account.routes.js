const app = require("../app");
const AccountController = require('../controllers/account.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/register-account", AccountController.registerAccount);
    router.post("/login", AccountController.login)
    app.use('/api/account', router);
}