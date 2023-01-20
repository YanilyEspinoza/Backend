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

router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
      let cidResp = await cartManager.getCartById(cid)
      if (!cidResp) {
          res.status(404).send({ error: `Product with id ${cid} not found. ${cidResp}` });
      } else {
          res.send(cidResp);
      }        
  } catch (error) {
      res.status(500).send({ error: "Error al intentar leer archivo con el params" });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity || 1;
  const cart = await cartManager.addProductToCart(cid, pid, quantity);
  if (cart) {
      res.status(200).json(cart);
  } else {
      res.status(404).json({ message: 'Cart not found' });
  }
});

module.exports = router
