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

document.getElementById("deleteProductForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const productId = {id: document.getElementById("idInput").value};
    socket.emit("delete product", productId);
    console.log(productId)
});

socket.on("new product", (product) => {
    // Agregar el nuevo producto a la lista
    const li = document.createElement("li");
    li.innerHTML = `${product.title} - ${product.price}`;
    document.getElementById("productList").appendChild(li);
});

socket.on("delete product", (productId) => {
    // Eliminar el producto correspondiente de la lista
    const productList = document.getElementById("productList");
    const products = Array.from(productList.getElementsByTagName("li"));
    for (const product of products) {
        if (product.dataset.productId === productId) {
            productList.removeChild(product);
            break;
        }
    }
});