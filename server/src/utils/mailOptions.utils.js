class MailOption {

    static registrationSuccess(name, senderEmail, recipientEmail) {
        return {
            from: senderEmail,
            to: recipientEmail, // Thay đổi thành địa chỉ email của người dùng đã đăng ký
            subject: 'Successful Registration', // Chủ đề của email
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5; 
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
            
                    h1 {
                        color: #007bff;
                        margin-bottom: 20px; /* Added spacing */
                    }
            
                    p {
                        margin-bottom: 20px; 
                    }
            
                    .call-to-action {
                        background-color: #007bff; 
                        border: none;
                        color: #fff;
                        padding: 12px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-size: 15px;
                        margin-top: 15px; /* Added spacing */
                        display: inline-block; /* For better button alignment */
                    }
            
                    .signature {
                        margin-top: 30px;
                        font-style: italic;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Dear ${name},</h1>
                    <p>Thank you for registering on our platform! We're thrilled to have you join our community.</p>
                    <p>Your account is now active, and you can start exploring all that we have to offer.</p>
            
                    <a href="[Your Website Link]" class="call-to-action">Explore Now</a>
            
                    <p>Please let us know if you have any questions or need assistance.</p>
                    <p class="signature">Best regards,<br/>[Your Company Name] Team</p>
                </div>
            </body>
            </html>
            
            `
        };
    }

    static bookingSuccess(name, senderEmail, recipientEmail, bookingDetails) {
        return {
            from: senderEmail,
            to: recipientEmail, // Thay đổi thành địa chỉ email của người dùng đã đặt vé
            subject: 'Booking Confirmation', // Chủ đề của email
            html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5; 
                        color: #333;
                        margin: 0;
                        padding: 20px;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
            
                    h1 {
                        color: #007bff;
                        margin-bottom: 20px; /* Added spacing */
                    }
            
                    p {
                        margin-bottom: 20px; 
                    }
            
                    .booking-details {
                        margin-bottom: 20px;
                        border: 1px solid #ddd;
                        padding: 10px;
                        border-radius: 5px;
                    }
            
                    .signature {
                        margin-top: 30px;
                        font-style: italic;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Dear ${name},</h1>
                    <p>Thank you for booking with us! Your booking has been confirmed.</p>
                    
                    <div class="booking-details">
                        <h2>Booking Details</h2>
                        <p><strong>Booking ID:</strong> ${bookingDetails.booking_id}</p>
                        <p><strong>Screening ID:</strong> ${bookingDetails.screening_id}</p>
                        <p><strong>Booking Time:</strong> ${bookingDetails.booking_time}</p>
                        <p><strong>Total Price:</strong> ${bookingDetails.total_price}</p>
                    </div>
            
                    <p>We look forward to seeing you at the event!</p>
                    <p class="signature">Best regards,<br/>[Your Company Name] Team</p>
                </div>
            </body>
            </html>
            `
        };
    }
}

module.exports = MailOption;
