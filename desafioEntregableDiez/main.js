/* 
  Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso,
una tabla con la lista de productos en tiempo real. 
Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.
>> Aspectos a incluir en el entregable:
Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend. Considerar usar archivos públicos para alojar
la plantilla vacía, y obtenerla usando la función fetch( ). Recordar que fetch devuelve una promesa.
  <<>> Consigna 2:  Añadiremos al proyecto un canal de chat entre los clientes y el servidor.
>> Aspectos a incluir en el entregable:
  <<>>En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email. 
  <<>>El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde) 
  <<>>Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón. 
Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).
*/



const express = require( 'express' );
const { engine } = require('express-handlebars');
const prodRouter = require('./routes/prodRouter');

const {products} = require('./class/prodClass')
const { chats} = require('./class/chatClass')

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {cors: {origin: "*"}});


app.use(express.json());
app.use(express.static(__dirname + '/public'))
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

//tabla productos
  socket.emit('products', await products.getArray())
  

// nuevo producto
  socket.on('newProduct', async (product) => {
    products.addProduct(product);
    await io.sockets.emit('products', products)

  });

  //tabla chat
  socket.emit('chat', await chats.getArray())
  
  //nuevo chat
  socket.on('newMessage', async msg => {
    chats.addProduct(msg);
    io.sockets.emit('chat', await chats.getArray())
  });
  
  


})



app.use('/api', prodRouter)

httpServer.listen(8080, () =>
console.log(`Listening in port 8080`)
);


