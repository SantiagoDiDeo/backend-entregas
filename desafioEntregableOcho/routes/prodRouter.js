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
    const product = await products.getById(id)
    product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})  

});

//post product
prodRouter.post('/productos', async (req, res) => {
    const productToAdd = await req.body
    await products.addProduct(productToAdd)
    res.redirect('/')
  })

//update product
prodRouter.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const  replace  = req.body;

    const index = id - 1;

    if(await products.adjustById( id, productToModify )){
        res.send({ message: 'producto modificado'})
      } else {
        res.status(404).send({ error: 'producto no encontrado'})
      }
    
});

//delete product
prodRouter.delete('/:id', async ( req, res ) => {
    const { id } = req.params;

    if (await products.delById(id)) {
        res.send({ message: 'producto borrado'})
      } else {
        res.status(404).send({ error: 'producto no encontrado'})
      }
});

module.exports = prodRouter;