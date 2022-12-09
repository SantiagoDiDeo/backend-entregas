/* 
>> Consigna: Realizar un proyecto de servidor basado en node.js y express que
ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes
rutas:
        //- GET '/api/productos' -> devuelve todos los productos.

        //- GET '/api/productos/:id' -> devuelve un producto segun su id.

        //- POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id
        asignado.

- PUT ‘/api/productos/:id' -> recibe y actualiza un producto segun su id.
        //- DELETE '/api/productos/:id' -> elimina un producto segun su id.

        // - Cada producto estara representado por un objeto con el siguiente formato:
        // {
        //     title: (nombre del producto),
        // price: (precio),
        // thumbnail: (url al logo o foto del producto)
        // }

        // - Cada item almacenado dispondra de un id numérico proporcionado por el backend,
        // comenzando en 1, y que se ira incrementando a medida de que se incorporen
        // productos. Ese id sera utilizado para identificar un producto que va a ser listado en
        // forma individual.

        // - Para el caso de que un producto no exista, se devolvera el objeto:
        // { error : ‘producto no encontrado’ }

        // - Implementar la API en una clase separada, utilizando un array como soporte de
        // persistencia en memoria.

        // - Incorporar el Router de express en la url base '/api/productos' y configurar todas las
        // subrutas en base a este.

- Crear un espacio publico de servidor que contenga un documento index.html con un
formulario de ingreso de productos con los datos apropiados.

- El servidor debe estar basado en express y debe implementar los mensajes de conexién
al puerto 8080 y en caso de error, representar la descripcidn del mismo.

        // - Las respuestas del servidor seran en formato JSON. La funcionalidad sera probada a
        // través de Postman y del formulario de ingreso. 

HECHO:



*/



const { Router } = require('express');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

const productsRouter = Router();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const productList = [
    {
        title: 'pelota',
    price: 2000,
    thumbnail: '(url al logo o foto del producto)',
    id: 1
    }
];


productsRouter.get('/', (req, res) => res.json(productList));

productsRouter.get('/:id', (req, res) => {
    let id = req.params.id
    let productsId = productList.find(item => item.id == id);

    if(!productsId) res.status(400).send({ error : 'producto no encontrado' })

    res.json({productsId})

})

productsRouter.post('/', (req, res) => {
    const  products  = req.body;
    let newId;
    productList.length === 0 || productList.length === undefined ? newId = 1 : newId = productList[ productList.length - 1].id + 1;
    const newProduct = {...products, id: newId};
    productList.push(newProduct);
    res.status(200).json({productList});
});

productsRouter.put('/:id', (req, res) => {
    const id = req.params;
    const  replace  = req.body;

    const index = id - 1;

    productList[index] = replace;
    
     res.status(200).json({replace});
    
})

productsRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

    const index = id - 1;

     productList.splice(index , 1);

    res.json({productList})
});

app.use('/api/productos', productsRouter);

app.listen(8080, () => console.log('listening in port 8080'));