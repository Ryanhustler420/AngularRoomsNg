const {normalizeErrors} = require('../helper/mongoose');
const jwt = require('jsonwebtoken');

const Rental = require('../models/rental');
const Booking = require('../models/booking');

exports.createBooking = function (req,res) {
    const {startAt, endAt, totalPrice, guests, days, rental} = req.body;
    const user = res.locals.user;

    const booking = new Booking({startAt,endAt,totalPrice,guests,days,rental});

    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(foundRental.user.id === user.id){
                return res.status(422).send({errors: [{title:'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
            }

            // Check here for valid booking

            return res.json({booking, foundRental});
        })
}