const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId : mongoose.Schema.Types.ObjectId,
    products : [
        {
            productId : mongoose.Schema.Types.ObjectId,
            quantity : {
                type : Number,
                default : 1,
                min : [1, "Quantity cannot be less than 1."]
            },
            name : String,
            price : Number
        }
    ],
    active : {
        type : Boolean,
        default : true
    },
    modifiedOn : {
        type : Date,
        default : Date.now
    },
},{
    timestamps : true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;