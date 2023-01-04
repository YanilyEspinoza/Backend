//node ProductManager.js

const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (title &&
            description &&
            price &&
            thumbnail &&
            code &&
            stock !== undefined
        ) {
            let products = await this.readProducts();
            const highestIdProduct = products.reduce((acc, curr) => {
                if (curr.id > acc.id) {
                    return curr;
                }
                return acc;
            }, { id: 0 });
            const product = {
                id: highestIdProduct.id + 1,
                code,
                title,
                description,
                thumbnail,
                stock,
                price,
            };
            if (products.find((product) => product.code === code)) {
                console.log("Código repetido")
            } else {
                products.push(product);
                await this.writeProducts(products);
                console.log("Se agregó el producto")
                console.log(products)
            }
        } else {
            console.log("Debe completar todos los datos")
        }
    };
    async getProducts() {
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
        /* const updatedProducts = products.filter(product => product.id !== id);
        await this.writeProducts(updatedProducts); //await
        return console.log(updatedProducts) */
    }
    async readProducts() {
        try {
            const contents = fs.readFileSync(this.path, 'utf8');
            const products = JSON.parse(contents);
            return products;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async writeProducts(products) {
        try {
            const productsString = JSON.stringify(products);
            fs.writeFileSync(this.path, productsString, 'utf8');
        } catch (error) {
            console.error(error);
        }
    }
}
const filePath = path.join(__dirname, 'products.json');
const productManager = new ProductManager(filePath);

//test node ProductManager.js

const test = async () => {
    try {
        // Obtener todos los productos
        let products = await productManager.getProducts();
        console.group("---1. Obtener todos los productos---")
        console.log(products);
        console.groupEnd();

        // Agregar 1 producto
        console.group("---2. Agregar 1 producto y darle id---")
        await productManager.addProduct(
            'Colador de Pasta',
            'Colador de Pasta de alta calidad',
            12000,
            'https://res.cloudinary.com/dhw4kmb5x/image/upload/v1667490839/fabihogar/colador_pasta1_s0als0.png',
            '12335',
            10,
        );
        console.groupEnd();

        // Obtener 1 producto por su ID
        console.group("---3. Obtener un producto por ID---")
        let idResp = await productManager.getProductById(2);
        console.log(idResp)
        console.groupEnd();

        // Actualizar un producto
        console.group("---4. Actualizar un producto---")
        await productManager.updateProduct(1, { title: 'Colador de Fideos' });
        console.groupEnd();

        // Eliminar un producto
        console.group("---5. Eliminar un producto---")
        await productManager.deleteProduct(3);
        console.groupEnd();

    } catch (err) {
        console.error(err);
    }
}
test()
