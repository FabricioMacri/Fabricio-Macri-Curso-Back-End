
// Desafío 3

// Herramientas 

import express from "express";
const app = express();
const PUERTO = 8080;

import ProductManager from "./src/productManager.js";
const productManager = new ProductManager("./src/products.js");

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas

app.get("/products", async (req, res) => {

    // Hago un try-catch para no cortar la ejecución del servidor
    try {
        // Obtengo del body enviado el límite que indica el cliente y cargo la lista de productos con ProductManager
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        // Si el limite es un valor valido devuelvo una lista partida con el límite indicado
        if (limit) {
            res.json(productos.slice(0, limit));
        } else {

            // Si el límite no esta especificado la devuelvo entera
            res.json(productos);
        }
    } catch (error) {

        // Manejo de errores 
        console.error("(500) No se encuentran los productos", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});


app.get("/products/:id", async (req, res) => {

    // Obtengo del body enviado el límite que indica el cliente
    const id = req.params.id;

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
    } catch (error) {
        // Manejo de errores 

        console.error("(500) No se encuentran los productos", error);
        res.status(500).json({
            error: "Error en el servidor"
        });
    }
});

