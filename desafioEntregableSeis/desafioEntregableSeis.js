const express = require( 'express' );
const { engine } = require('express-handlebars');
const prodRouter = require('./routes/prodRouter');

const ProductClass = require('./class/prodClass');
//const products = new ProductClass('./data/products.txt');

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});


app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

let products = {
  title: "Zanahoria",
  price: 35,
  thumbnail: "https://cdn4.iconfinder.com/data/icons/vegetables-58/48/11-carrot-512.png"
}

let chat = {
  email: 'hola@hola.com',
  message: 'hola!',
  date: new Date().toLocaleDateString()
};


//HANDLEBARS
app.set('views', './views/hbs');
app.set("view engine", "handlebars");
app.engine("handlebars", engine({
  extname: '.hbs',
  defaultLayout: 'main.handlebars',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));


app.get('/', async (req, res) => {
    res.render('form', {product: products, productExist: true});
  });


//socket
io.on('connection', (socket) => {
  console.log(`New connection id: ${socket.id}`);
  socket.emit('products', products)
  socket.emit('chat', chat)

  socket.on('newMessage', (msg) => {
    chat.push(msg);
    socket.emit('chat', chat)

  });
  
  socket.on('newProduct', (product) => {
    products.push(product);
    socket.emit('products', products)

  });


})



app.use('/api', prodRouter)

httpServer.listen(8080, () =>
console.log(`Listening in port 8080`)
);


