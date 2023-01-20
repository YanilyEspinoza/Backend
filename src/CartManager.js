const fs = require('fs');
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ;

class CartManager {
    constructor(path) {
        this.path = path;
        this.counter = 1;
    }

    async createCart(cart) {
        if (cart !== undefined) {
            let carts = await this.readCarts();
            const newCart = {
                id: this.counter,
                ...cart
            };
            this.counter++;
            carts.push(newCart);
            await this.writeCarts(carts);
            console.log("Se agregó el carrito al arreglo")
            return newCart;
        }
    }

  /*   async getProducts() {
        const products = await this.readProducts();
        return products;
    }
    async getProductById(id) {
        const products = await this.readProducts();
        const product = await products.find(product => product.id === id);
        return product;
    }
    async updateProduct(id, updates) {
        const products = await this.readProducts();
        const index = await products.findIndex(product => product.id === id);
        if (index === -1) return false;
        Object.assign(products[index], updates);
        await this.writeProducts(products);
        const updatedProduct = products[index];
        console.log(updatedProduct);
        return updatedProduct;
    }
    async deleteProduct(id) {
        let products = await this.readProducts();
        try {
            products = products.filter(ele => ele.id != id)
            await this.writeProducts(products)
            console.log(products)
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    } */
    async readCarts() {
        try {
            const contents = fs.readFileSync(this.path, 'utf8');
            let carts = JSON.parse(contents);
            console.log(carts)
            return carts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async writeCarts(carts) {
        try {
            const cartsString = JSON.stringify(carts);
            fs.writeFileSync(this.path, cartsString, 'utf8');
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = CartManager;
const path = require('path');

const filePath = path.join(__dirname, '..', 'Carts.json');
const cartManager = new CartManager(filePath);
//node CartManager.js
const test = async () => {
    try {
        // Agregar 1 producto
        console.group("---2. Agregar 1 producto y darle id---")
        await cartManager.createCart(
            {
                make: 'Ford',
                model: 'Mustang',
                year: 1969
            }
        );
        console.groupEnd();
    } catch (err) {
        console.error(err);
    }
}
test()
