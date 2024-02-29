//                                    -- Primer desafío --

class ProductManager {

    // Declaro el constructor de la clase con la lista vacía de productos
    constructor(){

        this.products = [];
    }

    // Método para agregar productos
    //  En todas las validaciones al no cumplirse se lanza un mensaje por consola indicando el error
    addProduct(tittle, description, price, thumbnail, code, stock){

        //Hago la primera validacion controlando que los parametros recibidos no esten vacios o sean nulos
        if(tittle, description, price, thumbnail, code, stock != undefined){

            //Controlo que el codigo del producto no este repetido
            const flag = this.products.some((el) => el.code === code);

            if(!flag){

                // Incremento en 1 el último ID registrado o en su defecto le asigno el valor 1
                let newID = 1;
                if(this.products.length != 0) { newID = this.products[this.products.length - 1].ID + 1; }

                const newProd = new Products(newID, tittle, description, price, thumbnail, code, stock);
                this.products.push(newProd);
                console.log("El producto fue agregado coorectamente.")

            }
            else { console.log("El código ingresado es inválido.") }
        }
        else { console.log("Faltan campos por ingresar.")}
    }

    // Método que devuelve un arreglo con todos los productos
    getProducts() {

        return this.products;

    }

    // Método que busca productos por ID
    getProductById(id) {

        const flag = this.products.some((el) => el.ID === id);

        if(flag){

            return this.products.find((el) => el.ID === id);
        }
        else{ console.log("Not found") }
    }

}

// Clase de los productos para trbajarlos como objetos
class Products {

    constructor(ID, tittle, description, price, thumbnail, code, stock){

        this.ID = ID;
        this.tittle = tittle;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;

    }
}


// Creo una instancia de la clase ProductManager

const instancia = new ProductManager();

console.log(instancia.getProducts());

instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(instancia.getProducts());

instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(instancia.getProductById(1));

instancia.getProductById(15);