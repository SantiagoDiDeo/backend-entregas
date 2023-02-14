const express = require( 'express' );
const {products} = require('../class/prodClass')
const { faker } = require('@faker-js/faker');
const { mockProducts } = require('../class/mockClass');
faker.locate = 'es';
const { Router } = express;
const session = require('express-session')

const prodRouter = Router();

let users = [];



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
    await products.add(productToAdd)
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

prodRouter.get('/productos-test', (req, res) => {
  const products = mockProducts.getArray();
  console.log(products)
  res.json(products);
})






prodRouter.post('/signup', (req, res) => {
  const {username, password} = req.body;

    const existentUser = users.find(user => user.username)
    if (existentUser) {
        res.status(403).send('el usuario ya existe')
        return
    } else {

      users.push({username, password});
      
      req.session.username = username;

      res.send(`hola ${req.session.username}! bienvenido!! `)
      

    }
})

prodRouter.post('/login', async (req, res) => {
  const {username, password} = req.body;

   req.session.username = username

   req.session.counter = (req.session.counter ?? 0) + 1;

   const existentUser = users.find(user => user.username)

if(!existentUser) {

  res.status(403).send('el usuario no existe')
  return;
} else {
  res.send(`hola ${req.session.username}! bienvenido!! has entrado ${req.session.counter} veces`)
  
}

})


prodRouter.get('/logout', async (req,res) => {


     req.session.destroy(  () => {
       res.send(`Hasta luego ${req.session.username}`)
    })
    res.redirect('/')
})

module.exports = prodRouter;