const {normalizeErrors} = require('../helper/mongoose');
const jwt = require('jsonwebtoken');

exports.createBooking = function (req,res) {
    res.json({
        'createdBooking':'ok'
    });
}