const express = require("express")
const mongoose = require("mongoose")
const Cart = require('../models/Cart')

const router = express.Router()


/* 
GET
"/:id"
POST
"/:id"
PUT
"/:id"
DELETE
"/:userId/:id"
*/


// Add to cart
router.post("/", (req, res) => {
    const { productId, quantity, name, price } = req.body;
  
    const userId = "6195180b7fe7f270fa667503"; //TODO: the logged in user id
  
    try {
      let cart = Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p._id == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });



module.exports = router