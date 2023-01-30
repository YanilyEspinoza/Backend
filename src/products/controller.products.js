const { Router } = require('express')
const router = Router()

const path = require('path');
const ProductManager = require('../ProductManager');
const filePath = '../Products.json'
const productManager = new ProductManager(filePath);

router.get('/', async (req, res) => {
  const { limit } = req.query;
  try {
    let products = await productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    
    res.send(`
      <table>
        <tr>
          <th>Nombre del producto</th>
          <th>Precio</th>
          <th>Descripción</th>
        </tr>
        ${products.map(product => `
          <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
          </tr>
        `).join('')}
      </table>
    
    <form action="/api/products" method="post">
      <input type="text" name="title" placeholder="Título">
      <input type="text" name="description" placeholder="Descripción">
      <input type="text" name="code" placeholder="Código">
      <input type="number" name="price" placeholder="Precio">
      <input type="number" name="stock" placeholder="Stock">
      <input type="text" name="category" placeholder="Categoría">
      <input type="text" name="thumbnail" placeholder="thumbnail">
      <input type="submit" value="Agregar Producto">
    </form>
  `
    );
  } catch (err) {
    res.status(500).send({ error: "Error al intentar leer archivo" });
  }
});

router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    let product = await productManager.getProductById(pid);
    if (!product) {
      res.status(404).send({ error: `Product with id ${pid} not found.` });
    } else {
      res.send(`
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Mi Aplicación</title>
</head>
<body>
            <table>
              <tr>
                <th>Nombre del producto</th>
                <td>${product.title}</td>
              </tr>
              <tr>
                <th>Precio</th>
                <td>${product.price}</td>
              </tr>
              <tr>
                <th>Descripción</th>
                <td>${product.description}</td>
              </tr>
            </table>
          
          <form>
          <input type="text" id="title" placeholder="Título" value="${product.title}">
          <input type="text" id="price" placeholder="Precio" value="${product.price}">
          <input type="text" id="description" placeholder="Descripción" value="${product.description}">
          
            <input type="button" value="Actualizar Producto" onclick="updateProduct()">
          </form>

          <form>
          <input type="hidden" id="pid" value="${pid}">
            <input type="button" value="Eliminar Producto" onclick="deleteProduct()">
          </form>

          <script>
          function updateProduct() {
            const pid = document.getElementById('pid').value;
            const updates = {
              title: document.getElementById('title').value,
              price: document.getElementById('price').value,
              description: document.getElementById('description').value
            };
            fetch('/api/products/${pid}', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updates)
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                alert('Product updated successfully');
              })
              .catch(error => {
                console.error(error);
                alert('Error updating product');
              });
          }          
</script>

<script>
  function deleteProduct() {
    const pid = document.getElementById('pid').value;
    fetch('/api/products/${pid}', {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(data.message);
      })
      .catch(error => {
        console.error(error);
        alert('Error al eliminar producto');
      });
  }
</script>

          </body>
</html>`
          );
    }
  } catch (error) {
    res.status(500).send({ error: "Error al intentar leer archivo con el params" });
  }
});

router.post('/', async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.body.thumbnail || [];
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
