const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
    _id : String,
    products : [String],
    quantity : Number,
    price : Number
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;