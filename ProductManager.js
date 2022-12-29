//Éste debe poder agregar, consultar, """"modificar"""" y 
//""""eliminar"""" un producto y manejarlo en persistencia 
//de archivos (basado en entregable 1).

/* --Debe tener un método addProduct el cual debe recibir un objeto con el 
formato previamente especificado, asignarle un id autoincrementable y 
guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
--Debe tener un método getProducts, el cual debe leer el archivo de productos y
 devolver todos los productos en formato de arreglo.
--Debe tener un método getProductById, el cual debe recibir un id, y tras leer
 el archivo, debe buscar el producto con el id especificado y devolverlo en 
 formato objeto 
-- Debe tener un método updateProduct, el cual debe recibir el id del producto
 a actualizar, así también como el campo a actualizar
  (puede ser el objeto completo, como en una DB), y debe actualizar
   el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
--Debe tener un método deleteProduct, el cual debe recibir un id y debe eliminar
 el producto que tenga ese id en el archivo.
 */

 const fs = require('fs')
const { json } = require('stream/consumers')

class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
        this.id = 1
    }
    async getAll() {
        try {
            const objects = await fs.promises.readFile(this.path, 'utf-8')
            JSON.parse(objects)
            let nuevos= JSON.parse(objects)
            const cualquiercosa = New ProductManager
            nuevos.forEach(e=>cualquiercosa.addProduct(e))
            
            return       
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }
    
    addProduct(code, title, description, thumbnail, stock, price) {
        if (
            code &&
            title &&
            description &&
            thumbnail &&
            stock != undefined &&
            price 
        ) {
        const product = {
            id: this.id,
            code,
            title,
            description,
            thumbnail,
            stock,
            price,
        };

        if (this.products.find((product) => product.code === code)) {
            console.log("Código repetido")
        } else {
            this.id++;
            this.products.push(product);
            console.log("Se agregó el producto")
        }
        } else {
            console.log ("Debe completar todos los datos")
        }
    }

    getProducts() {
        this.products.length > 0
        ? this.products.forEach((products) => console.log(products))
        : console.log("No hay productos")
    }

    getProductById(id) {
        this.products.find((product) => product.id === parseInt(id))
        ? console.log( this.products.filter((product) => product.id === parseInt(id)))
        : console.log ("Not found")
    }
    async deleteById(id) {
        let objects = await this.getAll()

        try {
            objects = objects.filter(ele => ele.id != id)
            await this.saveFile(this.file, objects)

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }
}
const productos = new ProductManager('Products.json');
const test = async () => {
    try {
        let array = await productos.getAll()
    } catch (err) {
        console.log(err)
    }
}
test()
/* 
node ProductManager.js
//Add products
console.group("-- Añadiendo productos --")
cocina.addProduct(
    "Cocina Haier",
    "Cocina de gas",
    "50000",
    "imgCocina1",
    "95895",
    "10"
)
cocina.addProduct(
    "Cocina Haier",
    "Cocina Eléctrica",
    "60000",
    "imgCocina2",
    "95896",
    "12"
)

//Producto repetido
cocina.addProduct(
    "Cocina Haier",
    "Cocina Eléctrica",
    "60000",
    "imgCocina2",
    "95896",
    "12"
)
console.groupEnd();

//Find ID
console.group("-- Producto 1 --")
cocina.getProductById(1);
console.groupEnd();
console.group("-- Producto 2 --")
cocina.getProductById(2)
console.groupEnd();

//Id not found
console.group("-- Producto no encontrado --")
cocina.getProductById(3)
console.groupEnd();

// All products
console.group("-- Productos del arreglo --")
cocina.getProducts();
console.groupEnd();
 */