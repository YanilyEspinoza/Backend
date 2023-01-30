const { Router } = require('express');
const uploader = require('../utils')
const router = Router()

const path = require('path');
const { title } = require('process');
const ProductManager = require('../ProductManager');
const filePath = '../Products.json'
const productManager = new ProductManager(filePath);

router.get('/', async (req, res) => {
  try {
    let products = await productManager.getProducts();
    res.render('home.handlebars', {
    products: products,
    title: 'socket.io',
    style: 'index.css'
  })
} catch (err) {
    res.status(500).send({ error: "Error al intentar leer archivo" });
}  
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    let products = await productManager.getProducts();
    res.render('realtimeproducts.handlebars', {
    products: products,
    title: 'socket.io',
    style: 'index.css'
  })
} catch (err) {
    res.status(500).send({ error: "Error al intentar leer archivo" });
}  
});

module.exports = router
