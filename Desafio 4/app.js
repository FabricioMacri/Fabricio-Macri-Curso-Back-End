
// Desafío 

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
