const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Login model
const loginSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Login = mongoose.model('Login', loginSchema)
module.exports = Login

// Sign up model
const signUpSchema = new Schema ({
    name : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const SignUp = mongoose.model('SignUp', signUpSchema)
module.exports = SignUp