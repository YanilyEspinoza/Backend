const { Router } = require('express');
const uploader = require('../utils')
const router = Router()

const path = require('path');
const { title } = require('process');
const ProductManager = require('../ProductManager');
const filePath = '../Products.json'
const productManager = new ProductManager(filePath);

//products =[]

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

/* router.get('/', async (req, res) => {
  res.json({ message: products })
}); */

router.get('/holis', async (req, res) => {
  const hola ={
    name: "luiseee",
    variedad : "ven"

  }
  res.render('hola', {
    hola,
    style: 'index.css',
    title: 'Desafío 5'
  })
});

/* router.get('/', async (req, res) => {
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
}); */

router.get('/:pid', async (req, res) => {
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
//USANDO MULTER

router.post('/', uploader.single('file'), async (req, res) => {
  try {
  if(!req.file){
    return res.status(400).json({ message: 'No pudimos almacenar la imagen'})
  }
  const { name, country } = req.body

  const product= {
    name,
    country
  }

  product.profile = req.file.path

  products.push(product)

  res.json({ message: 'Usuario creado'})
  
  } catch (err) {
    res.status(500).json({ error: `${err}`});
  }
});

/* router.post('/',  async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.body.thumbnail || [];
  try {
    await productManager.addProduct(title, description, code, price, stock, category, thumbnail);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
}); */

router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const updates = req.body;
  try {
    const updatedProduct = await productManager.updateProduct(pid, updates);
    if (!updatedProduct) {
      res.status(404).json({ error: `Product with id ${pid} not found.` });
    } else {
      res.json(updatedProduct);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    await productManager.deleteProduct(pid);
    res.json({ message: `Producto con id ${pid} eliminado exitosamente` });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router
