# Primera Entrega Proyecto Final

## Consigna

Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

1. Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:
    - La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior.
    - La ruta GET /:pid deberá traer sólo el producto con el id proporcionado.
    
2. La ruta raíz POST / deberá agregar un nuevo producto con los campos:
    - id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo.
    - title:String,
    - description:String
    - code:String
    - price:Number
    - status:Boolean
    - stock:Number
    - category:String
    - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
       #### - Status es true por defecto.
       #### - Todos los campos son obligatorios, a excepción de thumbnails

3. La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
4. La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 

## Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

1. La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
    - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    - products: Array que contendrá objetos que representen cada producto.
2. La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
3. La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo).
    - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.

No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

## Sugerencias

No es necesario implementar multer

## Formato del entregable

Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.

# Testeo en Postman
1. Iniciar el servidor en la carpeta src escribiendo en la consola:
```
node index.js
```
2. Aplicar las rutas  que se muestran a continuación en postman.
## *- - - PRODUCTOS - - -*
### - Test del método get:
Ruta: 
```
localhost:8080/api/products
```
### - Test del método get/:pid:
Ruta: 
```
localhost:8080/api/products/1
```
### - Test del método post:
Ruta: 
```
localhost:8080/api/products
```
Cuerpo:
```
{
    "title": "Producto nuevo",
    "description": "Descripcion del producto",
    "code": "123456",
    "price": 150,
    "stock": 20,
    "category": "Tecnologia",
    "thumbnail": [
        "images/producto1.jpg",
        "images/producto2.jpg"
    ]
}
```

### - Test del método put:
Ruta: 
```
localhost:8080/api/products/1
```
Cuerpo:
```
{
"title": "Nuevo título",
"description": "Nueva descripción"
}
```

## *- - - CARRITO - - -*

### - Test del método post:
Ruta: 
```
localhost:8080/api/carts/
```
Cuerpo:
```
{
    "products": [
        {
            "name": "Producto 1",
            "description": "Descripcion del producto 1",
            "price": 10
        },
        {
            "name": "Producto 2",
            "description": "Descripcion del producto 2",
            "price": 20
        },
        {
            "name": "Producto 3",
            "description": "Descripcion del producto 3",
            "price": 30
        }
    ]
}
```
### - Test del método GET:
Ruta: 
```
localhost:8080/api/carts/ + "CID del carrito generado con el metodo POST"
```

### - Test del metodo Post:
Ruta:
```
 localhost:8080/api/carts/ + "CID del carrito generado con el metodo POST" /product/ + "Número de ID seleccionado"
```
Cuerpo: 
```
{
    "quantity": 1
}
```
