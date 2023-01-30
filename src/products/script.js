function deleteProduct() {
    const pid = document.getElementById('pid').value;
    fetch(`/api/products/${pid}`, {
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
    