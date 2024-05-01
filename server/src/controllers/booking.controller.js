const BookingModel = require('../models/booking.model');
const sendMail = require('../models/mail.model');
const MailOptions = require('../utils/mailOptions.utils');
const mailConfig = require('../configs/mail.config')

class BookingController {
    static bookTickets(req, res) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        const newBooking = new BookingModel({
            username: req.body.username,
            password: req.body.password,
            booking_time: new Date(),
            screenings_id: req.body.screenings_id,
            seatIds: req.body.seatIds
        })

        BookingModel.bookTickets(newBooking, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the booking."
                });
            } else {
                console.log(data);
                const bookingDetails = {
                    booking_id: data.booking_id,
                    screening_id: data.screenings_id,
                    booking_time: data.booking_time,
                    total_price: data.total_price
                }
                sendMail(MailOptions.bookingSuccess(data.name, mailConfig.user, data.email, bookingDetails));
                res.send(data);
            }
        })
    }
}

module.exports = BookingController;