const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user: String,
    products: Array,
});


const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;