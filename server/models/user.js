const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters']
    },
    email:{
        type: String,
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters'],
        required: 'Email is required',
        lowercase: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]
    },
    password:{
        type: String,
        required: 'Password is required',
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters']
    },
    rentals:[{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

userSchema.methods.isSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;

    const saltRound = 10;
    bcrypt.genSalt(saltRound, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User',userSchema);