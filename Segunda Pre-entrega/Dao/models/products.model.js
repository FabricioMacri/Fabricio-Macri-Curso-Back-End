const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

productsSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model("products", productsSchema);

module.exports = ProductsModel;