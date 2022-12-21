/* 
>>> Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

Considero que el motor de plantillas que prefiero es pug, ya que no utiliza demasiados simbolos que terminan complicando la vision del codigo, es mas facil de crear siempre y cuando se mantenga la logica de indentacion, y mas facil de leer por eso mismo.

 */

const express = require( 'express' );
const { engine } = require('express-handlebars');
const prodRouter = require('./routes/prodRouter');

const ProductClass = require('./class/prodClass');
const products = new ProductClass('./data/products.txt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HANDLEBARS
app.set('views', './views/hbs');
app.engine("handlebars", engine());
app.set("view engine", "handlebars");


app.get('/', (req, res) => {
    res.render('form');
  });


app.get('/productos', async (req, res) => {
    let productos =  await products.getArray();
    res.render('table', { productos });
});


//EJS
// app.set('views', './views/');
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('ejs/form.ejs');
// });

// app.get('/productos', async (req, res) => {
//     let productos = await products.getArray();
//     res.render('ejs/table.ejs', { productos });
//   });


// PUG
// app.set('views', './views/');
// app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//     res.render('pug/form.pug');
// });

// app.get('/productos', async (req, res) => {
//     let productos = await products.getArray();
//     res.render('pug/table.pug', { productos });
//  });


app.use('/api', prodRouter);

  const server = app.listen(8080, () =>
  console.log(`Listening in port 8080`)
);

server.on('error', err => console.log(`Error: ${err}`));
