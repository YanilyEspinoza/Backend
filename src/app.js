const express = require('express');
const app = express();
const path = require('path');
const ProductManager = require('./ProductManager');
const filePath = path.join(__dirname, '..', 'Products.json');
const productManager = new ProductManager(filePath);

app.use(express.urlencoded({extended:true})) //Para recibir datos complejos desde la URL

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        let products = await productManager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.send( products );
    } catch (err) {
        res.status(500).send({ error: "Error al intentar leer archivo" });
    }
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        let idResp = await productManager.getProductById(pid)
        if (!idResp) {
            res.status(404).send({ error: `Product with id ${pid} not found.` });
        } else {
            res.send(idResp);
        }        
    } catch (error) {
        res.status(500).send({ error: "Error al intentar leer archivo con el params" });
    }
});

app.listen(8080, () => {
    console.log('corriendo con express')
});
