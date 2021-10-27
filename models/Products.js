const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : String,
    price : Number,
    details : String,
    quantity : Number,
    stock : Number,
    image: String,
}, {
    timestamps : true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;