const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const app = express();

app.get('/test', (req, res)=>{
    res.json({message:"This is a test"})
})



// app.get('/', verifyToken, (req, res) => {  
//     jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//         console.log(err)
//       } else {
//         res.json({
//           message: 'Authed page with token and details...',
//           authData
//         });
//       }
//     });
//   });


app.post('/login', (req, res) => {

    const user =  {
        username: req.body.username,
        email : req.body.email,
        password: req.body.password
    }
    // const { username, email, password } = req.body
    // const user = User.findOne({ email })
    // if (user && (bcrypt.compare(password, user.password))){
        jwt.sign({user}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
            res.json({
            token
            });
        });
    // }

})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

module.exports = verifyToken
module.exports = app