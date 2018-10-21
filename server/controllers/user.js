const User = require('../models/user');
const {normalizeErrors} = require('../helper/mongoose');
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