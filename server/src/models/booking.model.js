const sql = require('./db.model');
const AccountModel = require('./account.model');

class BookingModel {
    constructor(booking) {
        this.username = booking.username;
        this.password = booking.password;
        this.booking_time = booking.booking_time;
        this.screenings_id = booking.screenings_id;
        this.seatIds = booking.seatIds;
    }

    static async bookTickets(newBooking, result) {
        const { username, password, booking_time, screenings_id, seatIds } = newBooking;
        try {
            const account = await new Promise((resolve, reject) => {
                sql.query(`SELECT * FROM Accounts WHERE username = '${username}' AND password = '${password}'`, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });

            if (account.length == 0) {
                result({ message: "Please log in to the system" }, null)
                return;
            }

            let occupiedSeatCount = await Promise.all(seatIds.map(async (id) => {
                try {
                    const seat = await new Promise((resolve, reject) => {
                        sql.query(`SELECT screening_id, Seats.seat_id, seat_number FROM Bookings INNER JOIN Booking_Details ON Bookings.booking_id = Booking_Details.booking_id INNER JOIN Seats ON Booking_Details.seat_id = Seats.seat_id  WHERE screening_id = ${screenings_id} AND Seats.seat_id = ${id}`, (err, res) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                    });
                    if (seat.length > 0) { // Kiểm tra xem mảng seat có hàng nào không
                        return seat[0].seat_number;
                    } else {
                        return null; // Trả về null nếu không có hàng nào
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }));

            if (occupiedSeatCount[0] != null) {
                const occupiedSeatsMessage = `Seats ${occupiedSeatCount.join(', ')} have already been booked. Please choose other seats.`;
                result({ message: occupiedSeatsMessage }, null);
                return;
            }

            const getAccount_id = await new Promise((resolve, reject) => {
                sql.query(`SELECT Accounts.account_id FROM MOVIE_BOOKING_DB.Accounts WHERE Accounts.username = '${username}';`, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })

            const account_id = getAccount_id[0].account_id;
            const getPice = await new Promise((resolve, reject) => {
                sql.query((`SELECT price FROM Screenings WHERE screening_id = ${screenings_id}`), (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })

            const price = getPice[0].price;
            const total_price = seatIds.length * price;
            await sql.query(`INSERT INTO MOVIE_BOOKING_DB.Bookings (account_id, screening_id, total_price) VALUES (${account_id}, ${screenings_id}, ${total_price});`, async (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                const booking_id = res.insertId;
                await Promise.all(seatIds.map(async (id) => {
                    await sql.query(`INSERT INTO MOVIE_BOOKING_DB.Booking_Details (booking_id, seat_id, price) VALUES (${booking_id}, ${id}, ${price});`)
                }))
                result(null, {
                    message: "Booking created successfully",
                    name: account[0].name,
                    email: account[0].email,
                    booking_id: booking_id,
                    booking_time: new Date,
                    total_price: total_price,
                    screenings_id: screenings_id
                });
            });
        } catch (error) {
            result(error, null);
        }
    }

}

module.exports = BookingModel;