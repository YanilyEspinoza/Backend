# DESAFÍO ENTREGABLE 1

## Consigna
Realizar una clase “ProductManager” que gestione un conjunto de productos. Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto que gestione debe contar con las propiedades:
- title (nombre del producto)
- description (descripción del producto)
- price (precio)
- thumbnail (ruta de imagen)
- code (código identificador)
- stock (número de piezas disponibles)

## Aspectos a incluir

1. Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
- Validar que no se repita el campo “code” y que todos los campos sean obligatorios
- Al agregarlo, debe crearse con un id autoincrementable
2. Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
3. Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
- En caso de no coincidir ningún id, mostrar en consola un error “Not found”


## Formato del entregable

Archivo de Javascript listo para ejecutarse desde node.
```
node ProductManager.js
```

