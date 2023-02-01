

const express = require( 'express' );
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/productsRouter');


const {products, carts} = require('./daos/importedDaos');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});


app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));


//HANDLEBARS
app.set('views', './views/hbs/partials');
app.set("view engine", "handlebars");
app.engine("handlebars", engine({
  extname: '.hbs',
  defaultLayout: 'main.handlebars',
  layoutsDir: __dirname + '/views/hbs/layouts',
  partialsDir: __dirname + '/views/hbs/partials'
}));


app.get('/', async (req, res) => {
    res.render('form', {product: products, productExist: true});
  });

//socket
io.on('connection', async socket => {
  console.log(`New connection id: ${socket.id}`);

//tabla
  socket.emit('products', await products.getArray());
  socket.emit('carts', await carts.getArray());
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    await products.addProduct(product);
    await io.sockets.emit('products', await products.getArray());

  });

  
  //nuevo carrito
  socket.on('newCart', async () => {
    io.sockets.emit('carts', await carts.getArray());
  });
  
});



app.use('/api', productsRouter);

httpServer.listen(8080, () =>
console.log(`Listening in port 8080`)
);


