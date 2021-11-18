const mongoose = require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        trim: true,
        required : [true, "Username is required"],
        minLength: 3
    },
    password : {
        type : String,
        min : 6,
        required : [true, "Password is required"],
    },
    email : {
        type : String, 
        unique : true,
        required: [true, "Email is required"], 
        index : true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], 

    },
    admin : Boolean
}, {
    timestamps : true
})

// Hashing and salting password
userSchema.pre('save', function(next) {
    let user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema)

module.exports = User;