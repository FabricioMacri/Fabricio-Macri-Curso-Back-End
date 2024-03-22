const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./models/products.json");

// Ruta para crear un nuevo carrito
router.post("/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

// Ruta para pedir un carrito por ID
router.get("/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCarritoById(cartId);
        res.json(cart.products);
    } catch (error) {
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
})

//Agrego un producto por id a un carrito tambien por id
router.post("/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1; 

    try {
        const updatedCart = await cartManager.addProduct(cartId,productId, quantity);
        res.json(updatedCart.products);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }

})

module.exports = router;
