const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const { products, carts } = require('./class/prodClass');
const productRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter');
const path = require ("path");

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


//socket
io.on('connection', async socket => {
  console.log(`New connection id: ${socket.id}`);

//productos-cliente
  socket.emit('productos', await products.getArray());
  socket.emit('carrito', await carts.getArray());
 
  //nuevo producto
  socket.on('update', async producto => {
    await products.save( producto );
    io.sockets.emit('productos', await products.getArray());
  });

  socket.on('newCart', async () => {
    socket.emit('carrito', await carts.getArray());
  });
  
});


app.set('views', path.resolve(__dirname, '. /public'));
app.use('/api', productRouter);
app.use('/api', cartRouter);

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Server listening in port ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));