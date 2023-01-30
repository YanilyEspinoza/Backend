const socket = io();

socket.emit('message', `hola soy el cliente`);

document.getElementById("addProductForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const product = {
        code: document.getElementById("codeInput").value,
        title: document.getElementById("titleInput").value,
        description: document.getElementById("descriptionInput").value,
        thumbnail: document.getElementById("thumbnailInput").value,
        stock: document.getElementById("stockInput").value,
        price: document.getElementById("priceInput").value
    };
    socket.emit("add product", product);
});

document.getElementById("deleteProductBtn").addEventListener("click", () => {
    const productId = "id_del_producto_a_eliminar";
    socket.emit("delete product", productId);
    console.log(productId)
});


socket.on("new product", (product) => {
    // Agregar el nuevo producto a la lista
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - ${product.price}`;
    document.getElementById("productList").appendChild(li);
});

// Escuchar el evento de eliminación de productos
socket.on("delete product", (productId) => {
    // Eliminar el producto correspondiente de la lista
    const productList = document.getElementById("productList");
    const products = productList.getElementsByTagName("li");
    for (let i = 0; i < products.length; i++) {
        if (products[i].dataset.productId === productId) {
            productList.removeChild(products[i]);
            break;
        }
    }
});