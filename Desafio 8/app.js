// Desafío 6

// Imports:
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const productsRouter = require('./routes/products.router.js');
const viewsRouter = require("./routes/views.router.js");
const sessionRouter = require("./routes/session.router.js");
const userRouter = require("./routes/user.router.js");
const app = express();
const PUERTO = 8080;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));

// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


// Routes
app.use('/api/', productsRouter);
app.use("/", viewsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

// Listen
const httpServer = app.listen(PUERTO, () => {

    console.log('Escuchando puerto: ' + PUERTO);
})

// Chat

const MessageModel = require("./Dao/models/message.model.js");
const CartModel = require("./Dao/models/cart.model.js");
const io = new socket.Server(httpServer);

io.on("connection",  (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", async data => {

        //Guardo el mensaje en MongoDB: 
        await MessageModel.create(data);

        //Obtengo los mensajes de MongoDB y se los paso al cliente: 
        const messages = await MessageModel.find();
        io.sockets.emit("message", messages);
     
    })
    socket.on('newCart', async data => {
        const newID = await CartModel.create(data);
        io.sockets.emit("cartID", newID);
    })
    socket.on('updateCart', async data => {
        console.log(data.id);
        await CartModel.findByIdAndUpdate(data.id, data);
    })
})

// Conexión a MongoAtlas
mongoose.connect('mongodb+srv://midorilineok:desafio6@cluster0.ykwza2b.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Se conecto correctamente'))
    .catch((error) => console.log('Se produjo el siguiente error al intentar conectar: ', error))
