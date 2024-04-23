const express = require('express');
const router = express.Router();

const ProductsModel = require('../Dao/models/products.model.js');

router.get('/products', async (req, res) => {

    try {
        const products = await ProductsModel.find();
        res.json(products);
    } catch (error) {

        res.status(500).json("Error en el servidor.")

    }
})

router.get("/products/:id", async (req, res) => {

    const IDreq = req.params.id; 
    try {

        const product = await ProductsModel.findById(IDreq);
        if (!product) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

router.post("/", async (req, res) => {
    const newProduct = req.body;
    //Tomamos los datos del body de la petición. 
    try {
        const product = new ProductsModel(newProduct);
        await product.save();
        res.send({message: "Usuario creado exitsoamente", product});
    } catch (error) {
        res.status(500).json("Error interno del servidor", error);
    }
})

//Actualizamos un usuario por ID

router.put("/:id",  async (req, res) => {
    const IDreq = req.params.id; 
    const newData = req.body;

    try {
        const product = await ProductsModel.findByIdAndUpdate(IDreq, newData);
        res.status(200).send({message: "Producto actualizado: ", product});
        
    } catch (error) {
        res.status(500).json("Error interno del servidor");
    }
})


//Eliminamos un usuario por ID

router.delete("/:id", async (req, res) => {
    const IDreq = req.params.id;
    try {
        const product = await ProductsModel.findByIdAndDelete(IDreq);
        if(!product) {
            return res.status(404).send("Producto no encontrado");
        }
        res.status(200).send("Producto eliminado correctamente");
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})


module.exports = router;