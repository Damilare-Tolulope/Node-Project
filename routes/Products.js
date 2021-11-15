const express = require('express');
const router = express.Router()
const Product = require('../models/Products')
const verifyToken = require('./Auth')
const jwt = require('jsonwebtoken')

router.get('/', verifyToken, (req, res) => {  
    console.log("What : " + req.body)
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if(err) {
        res.sendStatus(403);
        console.log(err)
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });

// Get all products
// router.route('/').get((req, res) => {
//     Product.find()
//         .then(products => res.json(products))
//         .catch(err => res.status(400).json("Error : " + err))
// })


// Get one product by id
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json("Error : " + err))
})


// Add new product
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const details = req.body.details;
    const quantity = req.body.quantity;
    const stock = req.body.stock;
    const image = req.body.image;

    const newProduct = new Product({
        name,
        price,
        details,
        quantity,
        stock,
        image
    })

    newProduct.save()
        .then(() => res.json("Product Added"))
        .catch( err => res.status(400).json("Error :" + err))
})


// Delete one products
router.route('/:id').delete((req, res)=> {
    Product.findByIdAndRemove(req.params.id)
        .then(() => res.json("Product Removed"))
        .catch(err => res.status(400).json("Error : " +err))
})


// Update product
router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name,
            product.price = req.body.price
            product.details = req.body.details,
            product.quantity = req.body.quantity,
            product.stock = req.body.stock,
            product.image = req.body.image,

            product.save()
                .then( () => res.json("Product updated"))
                .catch( err => res.status(400).json("Error: " +err) )
        })
            
        .catch( err => res.status(400).json("Error: " +err) )
})

module.exports = router