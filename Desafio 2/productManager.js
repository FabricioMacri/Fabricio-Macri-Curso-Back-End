//                                    -- Segundo desafío --

const fs = require("fs");

class ProductManager {

    // Declaro el constructor de la clase con la lista vacía de productos
    constructor(path){

        this.products = [];
        this.path = path;
    }

    // Método para agregar productos
    //  En todas las validaciones al no cumplirse se lanza un mensaje por consola indicando el error
    async addProduct(tittle, description, price, thumbnail, code, stock){

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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                console.log("El producto fue agregado correctamente.");

            }
            else { console.log("El código ingresado es inválido.") }
        }
        else { console.log("Faltan campos por ingresar.")}
    }

    // Método imprime en consola un arreglo con todos los productos que tiene el archivo JSON
    async getProducts() {

        // Leo el archivo JSON y lo retorno como un objeto
        let file = await fs.promises.readFile(this.path, 'utf-8');
        console.log(JSON.parse(file));

    }

    // Método que busca productos por ID
    async getProductById(id) {

        // Leo el archivo JSON y busco el id pasado por parametro
        let file = await fs.promises.readFile(this.path, 'utf-8');
        let data = JSON.parse(file);
        
        const flag = data.some((el) => el.ID === id);

        if(flag){
            // Si encuentro el id retorno el producto completo como objeto
            return data.find((el) => el.ID === id);
        }
        else{ console.log("Not found") }
    }

    // Método que actualiza la información de un producto 
    async updateProduct(id, atribute, value) {

        // Leo el archivo JSON y busco el id pasado por parametro
        let file = await fs.promises.readFile(this.path, 'utf-8');
        let data = JSON.parse(file);
        
        const flag = data.some((el) => el.ID === id);

        if(flag){

            // Si encuentro el id obtengo el objeto y hago una lista con sus atributos.
            //  Si el campo a pasado es correcto inserto la información enviada
            //  y la guardo en la lista de la clase y también en el archivo

            let Prod = data.find((el) => el.ID === id);
            const atributos = Object.keys(Prod);
            const flag2 = atributos.some((el) => el === atribute);
            if(flag2) {
                data.find((el) => el.ID === id)[atribute] = value;
                await fs.promises.writeFile(this.path, JSON.stringify(data));
                this.products = data;
                console.log("El producto fue actualizado correctamente.");
            }
            else { console.log("El campo ingresado es inválido.") }
        }
        else{ console.log("Not found") }

    }

    // Método que elimina un producto
    async deleteProduct(id) {

        // Leo el archivo JSON y busco el id pasado por parametro
        let file = await fs.promises.readFile(this.path, 'utf-8');
        let data = await JSON.parse(file);
        
        const flag = data.some((el) => el.ID === id);

        if(flag){
            // Si encuentro el id hago una nueva lista filtrando el id y la guardo 
            //  en el JSON y en la lista de la clase

            let index = data.findIndex(objeto => objeto.ID === id);
            data.splice(index, 1);
            console.log("info: " + data + "index: " + index)
            await fs.promises.writeFile(this.path, JSON.stringify(data));
            this.products = data;
            console.log("El producto fue eliminado correctamente.")
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


// Sección de testeo:

const instancia = new ProductManager('./products.json');

instancia.getProducts();

instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

instancia.getProductById(1);

instancia.getProductById(15);

instancia.updateProduct(1, "description", "Este producto fue actualizado");

instancia.getProducts();

instancia.deleteProduct(1);

instancia.getProducts();

/* NOTA: Debido a la asincronia se ejecutan los métodos en diferente órden, por
          lo tanto el método getProducts() puede no siempre mostrar lo que realmente hay en el
          arreglo al momento de pedir la información.
          También es posible que 2 métodos se ejecuten al mismo tiempo y produzcan errores.
          Se recomienda:
            -Ejecutar los metodos de a uno y consultar el archivo JSON para validar el resultado
            -Agregar breakpoints para ver como el JSON se va modificando.

*/
