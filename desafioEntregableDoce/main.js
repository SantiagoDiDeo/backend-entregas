const express = require( 'express' );
const { engine } = require('express-handlebars');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});
const session = require('express-session');


const prodRouter = require('./routes/prodRouter');
const {products} = require('./class/prodClass');
const { chats} = require('./class/chatClass');
const connectToDb = require('./DB/config/connectToDb');
const passport = require('passport')


app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));
app.use(session({connectToDb, secret: 'secreto1', resave: true, saveUninitialized: true}));
app.use(passport.initialize())
app.use(passport.session())

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

//tabla productos
  socket.emit('products', await products.getArray())
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    products.add(product);
    await io.sockets.emit('products', products)

  });

  //tabla chat
  socket.emit('chat', await chats.getArray())
  
  //nuevo chat
  socket.on('newMessage', async (msg) => {
    chats.add(msg)
    io.sockets.emit('chat', await chats.getArray())
  });
  
  


})



app.use('/api', prodRouter)

httpServer.listen(8080, () =>
console.log(`Listening in port 8080`)
);


