const express = require('express');

const genresRoute = require('../routes/genres');
const customersRoute = require('../routes/customers');
const movieRoute = require('../routes/movies');
const rentalRoute = require('../routes/rentals');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const returnRoute = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/genres', genresRoute);
    app.use('/api/customers', customersRoute);
    app.use('/api/movies', movieRoute);
    app.use('/api/rentals', rentalRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/returns', returnRoute);

    app.use(error);
}