const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const app = express();


app.post('/login', (req, res) => {

    const user =  {
        username: req.body.username,
        email : req.body.email,
        password: req.body.password,
        admin: req.body.admin
    }


    User.findOne({ username: req.body.username })
     .then(result => {
        const userdb = result;

        user && (bcrypt.compare(user.password, userdb.password, (err, response) => {


            if (user.username === userdb.username && user.email === userdb.email && userdb.admin && response){
                jwt.sign({userdb}, process.env.JWT_SECRET_KEY, { expiresIn: '1m' }, (err, token) => {
                    // Generate admin token
                    console.log("Admin token generated")
                    res.json({
                        adminToken : token
                    });
                });
            }
            else if (user.username === userdb.username && user.email === userdb.email && !userdb.admin && response) {
                jwt.sign({userdb}, process.env.JWT_SECRET_KEY, { expiresIn: '1m' }, (err, token) => {
                    // Generate user token
                    console.log("User token generated")
                    res.json({
                        userToken : token
                    });
                });
            }
            else{
                console.log("No token generated")
                res.json({message : "Incorrect details"})
            }
        }))

     })
     .catch(err => res.json({Error: "Invalid details"}))

    

})

module.exports = app