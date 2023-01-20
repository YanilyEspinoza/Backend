const fs = require('fs');
const { v4 : uuidv4 } =  require('uuid');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart(cart) {
        if (cart !== undefined) {
            let cid = uuidv4()
            let carts = await this.readCarts();
            const newCart = {
                cid,
                ...cart
            };
            carts.push(newCart);
            await this.writeCarts(carts);
            console.log("Se agregó el carrito al arreglo")
            return newCart;
        }
    }

    async getCartById(cid) {
        const products = await this.readCarts();
        const product = await products.find(product => product.cid === cid);
        console.log(products)
        console.log(product)
        return product;
    }
 
    async addProductToCart(cid, pid, quantity = 1) {
        const carts = await this.readCarts();
        const cart = carts.find(cart => cart.cid === cid);
        if (!cart) {
            console.log(`Cart with id ${cid} not found.`);
            return;
        }
        if (!cart.products) {
            cart.products = [];
        }
        const existingProduct = cart.products.find(product => product.id === pid);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({
                id: pid,
                quantity: quantity
            });
        }
        await this.writeCarts(carts);
        console.log(`Product with id ${pid} added to cart with id ${cid}.`);
        return cart;
    }

    async readCarts() {
        try {
            const contents = fs.readFileSync(this.path, 'utf8');
            let carts = JSON.parse(contents);
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
