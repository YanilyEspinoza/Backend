const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async addProduct(title, description, code, price, stock, category, thumbnail) {
        if (title &&
            description &&
            price &&
            code &&
            category &&
            stock !== undefined
        ) {
            let products = await this.readProducts();
            const defaultstatus = true
            const highestIdProduct = products.reduce((acc, curr) => {
                if (curr.id > acc.id) {
                    return curr;
                }
                return acc;
            }, { id: 0 });
            const product = {
                id: highestIdProduct.id + 1,
                title,
                description,
                code,
                price,
                status: defaultstatus,
                stock,
                category,
                thumbnail  
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

module.exports = ProductManager;
