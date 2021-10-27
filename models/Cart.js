import { Schema } from "mongoose";

const cartSchema = new Schema({
    id : User._id,
    products : [String],
    quantity : Number,
    price : Number
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;