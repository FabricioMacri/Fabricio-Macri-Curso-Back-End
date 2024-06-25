const TicketModel = require("../models/ticket.model.js");
const ProductManager = require("./productManager_db.js");

class TicketManager {

    async addTicket({ code, amount, purchaser }) {
        try {

            if (!code || !amount || !purchaser) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existeTicket = await TicketModel.findOne({ code: code });

            if (existeTicket) {
                console.log("El codigo esta siendo utilizado por otro ticket");
                return;
            }

            const newTicket = new TicketModel({
                code,
                amount,
                purchaser
            });

            await newTicket.save();

        } catch (error) {
            console.log("Error al agregar ticket", error);
            throw error;
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await TicketModel.findById(id);

            if (!ticket) {
                console.log("Ticket no encontrado");
                return null;
            }

            return ticket;
        } catch (error) {
            console.log("No se pudo encontrar el ticket por ID");
        }
    }

    async updateTicket(id, ticketActualizado) {
        try {

            const updateado = await TicketModel.findByIdAndUpdate(id, ticketActualizado);

            if (!updateado) {
                console.log("No se pudo encontrar el ticket");
                return null;
            }

            return updateado;
        } catch (error) {
            console.log("Error al actualizar el ticket", error);

        }
    }

    async deleteTicket(id) {
        try {

            const deleteado = await TicketModel.findByIdAndDelete(id);

            if (!deleteado) {
                console.log("No se pudo encontrar el ticket");
                return null;
            }

        } catch (error) {
            console.log("Error al eliminar el ticket", error);
            throw error;
        }
    }

    async chekProducts(cart) {

        const result = {

            whiteList : [],
            blackList : []
        };

        try {
            
            if(!cart && cart.length > 0) {

                cart.forEach(cartProduct => {
                    
                    if(cartProduct.quantity < ProductManager.getProductById(cartProduct._id).quantity) {

                        return false;
                    }
                });

                return true;
            }
        } catch (error) {
            console.log("Error al leer los productos del carrito", error);
            throw error;
        }
    }
}

module.exports = TicketManager; 