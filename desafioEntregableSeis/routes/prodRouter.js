const { Router } = require( 'express' );
const express = require( 'express' );
const app = express();

const ProductClass = require('../class/prodClass')
const products = new ProductClass('./data/products.txt')

const productsRouter = Router();

//get all products
productsRouter.get('/', async ( req, res ) => {
    const allProducts = await products.getArray();
    console.log(allProducts)
    res.json( allProducts);
});

//get products by id
productsRouter.get('/:id', async ( req, res ) => {
    let id = req.params.id;
    let productsId = products.find( item => item.id == id );
    const product = await products.getById(id)
    if( !productsId ) res.status(400).send({ error : 'producto no encontrado' });

    res.json({ product });

});

//post product
productsRouter.post('/productos', async (req, res) => {
    const productToAdd = req.body
    await products.save( productToAdd )
    res.redirect('/')
  })

//update product
productsRouter.put('/:id', ( req, res ) => {
    const id = req.params;
    const  replace  = req.body;

    const index = id - 1;

    products[index] = replace;
    
    products.save(replace);
     res.status(200).json({replace});
    
});

//delete product
productsRouter.delete('/:id', ( req, res ) => {
    const { id } = req.params;

    const index = id - 1;

     products.splice( index , 1 );

    res.json({ products });
});

module.exports = productsRouter;