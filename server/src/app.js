const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
require('dotenv').config();

// init middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// init db



// init route
require('./routes/account.routes')(app);
require('./routes/movies.routes')(app);
require('./routes/booking.routes')(app);
// handing error




module.exports = app;