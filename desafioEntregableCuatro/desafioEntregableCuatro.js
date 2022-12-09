const { Router } = require( 'express' );
const express = require( 'express' );
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( 'public' ));

const productsRouter = Router();

const productList = [
    {
        title: 'pelota',
    price: 2000,
    thumbnail: '(url al logo o foto del producto)',
    id: 1
    }
];

//get all products
productsRouter.get('/', ( req, res ) => res.json( productList ));

//get products by id
productsRouter.get('/:id', ( req, res ) => {
    let id = req.params.id;
    let productsId = productList.find( item => item.id == id );

    if( !productsId ) res.status(400).send({ error : 'producto no encontrado' });

    res.json({ productsId });

});

//post product
productsRouter.post('/', ( req, res ) => {
    const  products  = req.body;
    let newId;
    productList.length === 0 || productList.length === undefined ? newId = 1 : newId = productList[ productList.length - 1].id + 1;
    const newProduct = { ...products, id: newId };
    productList.push( newProduct );
    res.status(200).json({ productList });
});

//update product
productsRouter.put('/:id', ( req, res ) => {
    const id = req.params;
    const  replace  = req.body;

    const index = id - 1;

    productList[index] = replace;
    
     res.status(200).json({replace});
    
});

//delete product
productsRouter.delete('/:id', ( req, res ) => {
    const { id } = req.params;

    const index = id - 1;

     productList.splice( index , 1 );

    res.json({ productList });
});

//router
app.use('/api/productos', productsRouter);

//listen port
app.listen(8080, () => console.log( 'listening in port 8080' ));