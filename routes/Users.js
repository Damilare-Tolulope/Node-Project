const express = require('express');
const router = express.Router();
const User = require('../models/User')
const verifyToken = require('../middlewares/verifyAuth')
const jwt = require('jsonwebtoken')

// router.get('/', verifyToken, (req, res) => {  
//     jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//         if(authData.userdb.admin){
//           User.find()
//             .then(users => res.json(users))
//             .catch(err => res.status(400).json("Error : " + err))
//         }else{
//           res.sendStatus(401)
//         }
//       }
//     });
//   });


// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error : " + err))
})


// Get one user by id
router.route('/:userId').get((req, res) => {
    User.findById(req.params.userId)
        .then( user => res.json(user))
        .catch(err => res.status(400).json("Error : " + err))
})


// Delete one user
router.route('/:userId').delete((req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then( () => res.json("Exercise delete"))
        .catch(err => res.status(400).json("Error : " + err))
})


// Add new user
router.route('/add').post((req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const admin = req.body.admin

    if(username && password && email){
      const newUser = new User({
          username,
          password,
          email,
          admin
      })
  
      newUser.save()
          .then( () => res.json("User added"))
          .catch(err => res.status(400).json("Error : " + err))

    }else{
      res.json({error: "Your details ins't complete"})
    }

})


// Update user
router.route('/update/:userId').post((req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            user.username = req.body.username,
            user.password = req.body.password,
            user.email = req.body.email

            user.save()
                .then( () => res.json("User updated"))
                .catch( err => res.status(400).json("Error: " +err) )
        })
        .catch(err => res.status(400).json("Error : " + err))

})

module.exports = router