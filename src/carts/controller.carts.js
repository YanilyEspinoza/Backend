const { Router } = require('express')
const router = Router()

const path = require('path');
const CartManager = require('../CartManager');
const filePath = '../Carts.json'
const cartManager = new CartManager(filePath);

router.post('/', async (req, res) => {
  const { products } = req.body;
  try {
  await cartManager.createCart(products);
  res.status(201).json({ message: 'Producto agregado al carrito exitosamente' });
  } catch (err) {
  res.status(500).json({ error: 'Error al crear carrito' });
  }
  });




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

router.post('/', async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.body.thumbnail || [];
  console.log(req.body)
  try {
    await productManager.addProduct(title, description, code, price, stock, category, thumbnail);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

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
