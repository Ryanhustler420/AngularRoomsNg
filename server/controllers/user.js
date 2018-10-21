const User = require('../models/user');
const {normalizeErrors} = require('../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function (req,res) {
    const {  email, password } = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password!'}]});
    }

    User.findOne({email} , function(err,user){
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(!user) {
            return res.status(422).send({errors:[{title: 'Invalid User!', detail: 'User does not exist'}]});
        }

        if(user.isSamePassword(password)){
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            },config.SECRET,{expiresIn: '1h'});
            return res.json(token);
        }else {
            return res.status(422).send({errors:[{title: 'Wrong Detail', detail: 'Wrong user or password'}]});
        }        
        
    });

}

exports.register = function(req, res) {
    const { username, email, password, passwordConfirmation } = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password!'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Password is not as same as confirmation!'}]});
    }

    User.findOne({email},function(err, existingUser){
        if(err){
            return res.status(422).send({'mongoose':'handle mongoose errors in next commit'});
        }

        if(existingUser){
            return res.status(422).send({errors: [{title: 'Invalid email', detail: 'User with this email already exist!'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
              return res.status(422).send({errors:normalizeErrors(err.errors)});
            }

            res.json({'register': true});
        });

    });
}

exports.authMiddleware = function(req,res,next) {
    const token = req.headers.authorization;
    if(token) {
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(user) {
                res.locals.user = user;
                next();
            }else{
                return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});              
            }
        }); 
    }else{
        return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}
