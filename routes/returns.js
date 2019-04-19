const express  = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validate } = require('../models/rental');
const Fawn = require('fawn');
const auth = require ('../middleware/auth');
const {Customer} = require ('../models/customer');
const {Movie} = require ('../models/movie');
const moment = require ('moment');
const _ = require('lodash');

// Fawn.init(mongoose);

router.post('/', auth, async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('no customer with the given Id');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('no movie with the given Id');

    const rental =await Rental.findOne({
        'customer._id' : req.body.customerId,
        'movie._id' : req.body.movieId
    });

    if(!rental) return res.status(404).send('no rental with the given Id');

    if(rental.dateReturned) return res.status(400).send('rental already processed');

    rental.dateReturned = new Date();
    const rentalDays =moment().diff(rental.dateOut, 'days');
    if(rentalDays > 1){
        rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
    }
    else{
        rental.rentalFee = rental.movie.dailyRentalRate
    }

    await rental.save();


    await Movie.update({_id: rental.movie._id}, {
        $inc: {numberInStock : 1}
    });

    // _.pick(res.send(),['rentalDays', 'rental.rentalFee']);
    res.send();
});


module.exports = router;