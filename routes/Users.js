const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error : " + err))
})


// Get one user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then( user => res.json(user))
        .catch(err => res.status(400).json("Error : " + err))
})


// Delete one user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then( () => res.json("Exercise delete"))
        .catch(err => res.status(400).json("Error : " + err))
})


// Add new user
router.route('/add').post((req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const newUser = new User({
        username,
        password,
        email
    })

    newUser.save()
        .then( () => res.json("User added"))
        .catch(err => res.status(400).json("Error : " + err))
})

module.exports = router