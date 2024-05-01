const app = require('../app');
const BookingController = require('../controllers/booking.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/booking-tickets", BookingController.bookTickets);

    app.use('/api/booking', router);
}