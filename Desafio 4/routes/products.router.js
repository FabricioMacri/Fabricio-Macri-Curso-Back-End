const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./models/products.json");


// Lista de productos
router.get("/products", async (req, res) => {

    // Hago un try-catch para no cortar la ejecución del servidor
    try {
        // Obtengo del body enviado el límite que indica el cliente y cargo la lista de productos con ProductManager
        const limit = req.query.limit;
        console.log(limit);
        const productos = await productManager.getProducts();

        // Si el limite es un valor valido devuelvo una lista partida con el límite indicado
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {

            // Si el límite no esta especificado la devuelvo entera
            console.log(productos);
            res.json(productos);
        }
    } 
    catch (error) {

        // Manejo de errores 
        console.error("(500) No se encuentran los productos", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});

// Obtener producto por ID
router.get("/products/:pid", async (req, res) => {

    // Obtengo del body enviado el límite que indica el cliente
    const id = req.params.pid;

    try {
        // Busco por ID el producto indicado por el cliente
        const producto = await productManager.getProductById(parseInt(id));

        // Si no se devuelve un objeto devuelvo un error
        if (!producto) {
            console.error("(404) No se encontró el producto indicado", error);
            return res.json({
                error: "El ID ingresado es inválido o no corresponde a un producto de la lista."
            });
        }

        res.json(producto);
    } 
    catch (error) {
        // Manejo de errores 

        console.error("(500) No se encuentran los productos", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});

// Agregar nuevo producto
router.post("/products", async (req, res) => {
    const nuevoProducto = req.body; 
    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({message: "Producto agregado exitosamente"});
    } 
    catch (error) {
        //console.log(error)
        res.status(500).json({error: "Error en el servidor"});
    }
})

// Actualizar un producto por ID
router.put("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const newProduct = req.body; 

    /*
    BODY PARA ACTUALIZAR:
    {
        parameter: atributo a modificar
        value: valor del atributo a modificar
    }
    */

    try {
        await productManager.updateProduct(parseInt(id), newProduct.parameter, newProduct.value);
        res.status(201).json({message: "Producto actualizado exitosamente"});
    } 
    catch (error) {
        res.status(500).json({error: "Error en el servidor"});
    }
})

// Eliminar producto por ID
router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid; 

    try {
        await productManager.deleteProduct(parseInt(id));
        res.status(201).json({message: "Producto eliminado exitosamente"});
    } catch (error) {
        res.status(500).json({error: "Error en el servidor"});
    }
})

module.exports = router;
