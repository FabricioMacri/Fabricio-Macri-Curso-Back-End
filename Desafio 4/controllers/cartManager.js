const fs = require("fs");

class CartManager {

    constructor(_path) {

        this.carts = this.getCarts();
        this.path = _path;

    }

    async getLastID() {

        const flag = this.getCarts();
        if (flag) {
            return (flag[flag.lastIndexOf()].id + 1)
        }
        else { return 1}
    }
    
    // Método para obtener los carritos guardados
    async getCarts() {

        try {
            const data = await fs.readFile(this.path, "utf-8");
            if (data){
                if (data.length > 0) {
                    return data;
                }
            }
            else { this.saveCarts();}
        }
        catch (error){
            console.log("No se pudo acceder a los carritos: ", error);
        }
    }

    // Método para guardar los carritos cargados en la clase
    async saveCarts() {

        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    // Método para crear un nuevo carrito
    async createCart() {

        const newCart = {
            id: getLastID(),
            products: []
        }

        this.carts.push(newCart);
        this.saveCarts();

        return newCart;
    }

    // Método para obtener un carrito por su id
    async getCartById(_id) {

        try {
            const cart = this.carts.find((element) => element.id == _id)

            if (cart) {

                return cart
            }
            else { console.log('El id ingresado es inválido o no se encuentra en la lista.') }
        }
        catch (error) {
            console.log("No se pudo encontrar el carrito: ", error);
        }
    }

    // Agregar producto al carrito
    async addProduct(_id, prodId, quantity) {

        const cart = await this.getCarritoById(_id);
        const flag = cart.products.find(product => product.ID === prodId);

        if (flag) {
            flag.quantity += quantity;
        } else {
            cart.products.push({ product: ID, stock });
        }

        await this.saveCarts();
        return cart;
    }
    
}

module.exports = CartManager;