const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helper/mongoose');
const User = require('../models/user');

router.get('/secret' , UserCtrl.authMiddleware, function(req,res){
    res.json({"secret":true})
});

router.get('/manage',UserCtrl.authMiddleware, function(req, res){
    const user = res.locals.user;

    Rental.where({user})
        .populate('rentals')
        .exec(function(err, foundRentals){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }   
            return res.json(foundRentals);
        });
});

router.get('/:id', (req,res) => {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err,foundRental){
        if(err){
           return res.status(422).send({error:[{title:'Rental Error!', detail: 'Could not find Rental!'}]});
        }
        return res.json(foundRental);
    });
});

router.delete('/:id',UserCtrl.authMiddleware, function(req,res) {
    const user = res.locals.user;
    Rental.findById(req.params.id)
    .populate('user','_id')
    .populate({
        path: 'bookings',
        select: 'startAt',
        match: {startAt: { $gt: new Date()}}
    })
    .exec(function(err,foundRental){
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(user.id !== foundRental.user.id){
            return res.status(422).send({error:[{title:'Invalid User!', detail: 'You are not rental owner!'}]});
        }

        if(foundRental.bookings.length > 0){
            return res.status(422).send({error:[{title:'Active Bookings!', detail: 'Could delete Rental with active Bookings!'}]});
        }

        foundRental.remove(function(err){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json({"Status": "deleted"});
        });
    });
});

router.post('', UserCtrl.authMiddleware, function(req,res){
    const {title , street, city, category, image, bedrooms, shared, description, dailyRate} = req.body;
    const newRental = new Rental({title , street, city, category, image, bedrooms, shared, description, dailyRate});
    const user =  res.locals.user;
    newRental.user = user;
    Rental.create(newRental , function(err,rental){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        User.update({_id: user.id}, {$push: {rentals:rental}},(err,data) => {});
        return res.json(rental);
    });

    
});

router.get('',(req,res) => {

    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {}

    Rental.find(query)
    .select('-bookings')
    .exec(function(err,foundRental){
        
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(city && foundRental.length == 0){
            return res.status(422).send({error:[{title:'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
        } 
        
        return res.json(foundRental);
    });
});



module.exports = router;