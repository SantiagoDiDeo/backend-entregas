const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { products, carts } = require('../class/prodClass');
const Cart = require('../class/cartClass');

const { Router } = express;
const cartRouter = Router(); 


cartRouter.post('/carrito', async (req, res) => {
  const idNewCart = uuidv4();
  const cart = new Cart(`./data/cart.txt`);
  cart.saveFile({ id: idNewCart, timestamp: new Date().toLocaleString(), products: [] });
  carts.addCart(idNewCart);
  res.send(idNewCart);
});

cartRouter.delete('/carrito/:id', async (req, res) => {
  const id = req.params.id;
  fs.unlink(`./data/${id}.txt`, (error) => {
    error ? console.log('No se ha podido borrar') : console.log('Borrado exitoso');
  });
  await carts.deleteById(id);
  res.send('Borrado exitoso');
});

cartRouter.get('/carrito/:id/productos', async (req, res) => {
  const id = req.params.id;
  const cart = new Cart(`./data/${id}.txt`);
  const products = await cart.getArray();
  res.send(products);
});

cartRouter.post('/carrito/:id/productos/:id_prod', async (req, res) => {
  const cartId = req.params.id;
  const itemId = req.params.id_prod;
  const item = await products.getById(itemId);
  await fs.readFile(`./data/cart.txt`, 'utf8', async (err, data) => {
    const carrito = await JSON.parse(data);
    await carrito.products.push(item);
    await fs.promises.writeFile(`./data/${cartId}.txt`, JSON.stringify( carrito, null, 2 ))
  });
  
  res.send('Producto agregado ');
});


cartRouter.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
  const cartId = req.params.id;
  const itemId = req.params.id_prod;
  const cart = new Cart(`./data/${cartId}.txt`);
  await cart.deleteById( itemId );
  res.send('Producto borrado exitosamente');
});

module.exports = cartRouter;