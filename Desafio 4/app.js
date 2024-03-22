
// Desafío 4

// NOTA: En la carpeta models se encuentra un archivo ejemplos.json, el cual tiene ejemplos de productos

// Herramientas 

const express = require("express");
const app = express();
const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js");

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas

app.use("/api", productsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})
