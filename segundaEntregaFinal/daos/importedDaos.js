const useMongoDb = require('../licenses/dbLicense/dbLicense.js');
const connectToDd = require('../DB/config/connectToFirebase');

let products;
let carts;


if (useMongoDb.useMongoDb) {
  products = require('./products/daoProducts.js');
  carts = require('./cart/daoCart.js');
} else {
  products = require('./products/daoProductsFirebase');
  carts = require('./cart/daoCartFirebase');
  connectToDd();
 
 };


module.exports = { products, carts };