class ProductManager {

    constructor(){
        this.products = []
        this.id = 1
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (
            title &&
            description &&
            price &&
            thumbnail &&
            code &&
            stock != undefined
        ) {
        const product = {
            code,
            title,
            description,
            thumbnail,
            stock,
            price,
            id: this.id,
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
}
let cocina = new ProductManager();

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
