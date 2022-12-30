const express = require( 'express' );
const {products} = require('../class/prodClass')

const { Router } = express;

const prodRouter = Router();

//get all products
prodRouter.get('/', async ( req, res ) => {
    const allProducts = await products.getArray();
    res.json(allProducts);
});

//get products by id
prodRouter.get('/:id', async ( req, res ) => {
    let id = req.params.id;
    let productsId = products.find( item => item.id == id );
    const product = await products.getById(id)
    product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})  

});

//post product
prodRouter.post('/productos', async (req, res) => {
    const productToAdd = await req.body
    await products.save(productToAdd)
    res.redirect('/')
  })

//update product
prodRouter.put('/:id', ( req, res ) => {
    const id = req.params;
    const  replace  = req.body;

    const index = id - 1;

    products[index] = replace;
    
    products.save(replace);
     res.status(200).json({replace});
    
});

//delete product
prodRouter.delete('/:id', ( req, res ) => {
    const { id } = req.params;

    const index = id - 1;

     products.splice( index , 1 );

    res.json({ products });
});

module.exports = prodRouter;