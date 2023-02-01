const express = require('express');
const { products } = require('../daos/importedDaos.js');
const user = require('../licenses/user/user');
const useMongoDb = require('../licenses/dbLicense/dbLicense');

const { Router } = express;
const productsRouter = Router(); 


productsRouter.get('/productos', async (req, res) => {
  const allProducts = await products.getArray();
  res.json( allProducts );
});

productsRouter.get('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const product = await products.getById( id );
  product ? res.json( product )
    : res.status(404).send({ error: 'Producto no encontrado'});
});

productsRouter.post('/productos', async (req, res) => {
  if (user.administrador){
    const productToAdd = req.body;
    await products.save( productToAdd );
    res.redirect('/');
  
  } else {
    res.status(403).send({error: -1, descripcion: 'No autorizado'});
  };
});


productsRouter.put('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id;
    const productToModify = req.body;
    let allProducts = await products.getArray(); 
    let index;

    useMongoDb.useMongoDb ? 
    index = allProducts.findIndex( item => item.id === id ) : 
    index = allProducts.findIndex( item => item._id === id ) 

    if ( index !== -1 ) {
      allProducts.splice( index, 1, {...productToModify});
      products.saveFile( allProducts );
      res.send({ productToModify });
    } else {
      res.status(404).send({ error: 'id invalido'});
    }
  } else {
    res.status(403).send({error: -1, descripcion: 'No autorizado'});
  };

});


productsRouter.delete('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id;
    const productToDelete = await products.getById( id );

    if (productToDelete) {
      await products.deleteById( id );
      res.send({ borrado: productToDelete});
    
    } else {
      res.status(404).send({ error: 'Producto no encontrado'});
    }
  
  } else {
    res.status(403).send({error: -1, descripcion: 'No autorizado'});
  }
  
});


module.exports = productsRouter;