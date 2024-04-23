const mongoose = require('mongoose');


const productsSchema = new mongoose.Schema({

    tittle: String,
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category: String,
    img: String,
    thumbnail: String
});

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = ProductsModel;