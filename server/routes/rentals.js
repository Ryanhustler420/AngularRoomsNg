const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helper/mongoose');

router.get('/secret' , UserCtrl.authMiddleware, function(req,res){
    res.json({"secret":true})
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


router.get('',(req,res) => {

    const city = req.query.city;

    if(city){

        Rental.find({city: city.toLowerCase()})
            .select('-bookings')
            .exec(function(err, filterRentals){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                if(filterRentals.length == 0){
                    return res.status(422).send({error:[{title:'No Rental Found!', detail: `There are no rentals for city ${city}`}]});
                }
                return res.json(filterRentals);
            })
    }else{
        Rental.find({})
        .select('-bookings')
        .exec(function(err,foundRental){
          return res.json(foundRental);
        });
    }    
});



module.exports = router;