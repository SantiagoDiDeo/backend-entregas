const connectToDd = require('../../DB/config/connectToMongo.js');
const Container = require('../../container/mongoContainer.js');
const { productModel } = require('../../DB/model/modelMongoDb.js');

class Product extends Container {

  async add( item ) {
    try{
      await connectToDd();
      const newProduct = new productModel( item );
      await newProduct.save()
        .then(product => console.log(`Agregado con exito. id: ${product._id}`))
        .catch(err => console.log(err))
      return;
    } catch(err) {
      console.log(`Error daoP1: ${err}`);
    };
  };

  async modifyById( id, item ) {  
    try {
      await connectToDd();
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $set: {...item}});
    } catch(err) {
      console.log(`Error daoP2: ${err}`);
      return false;
    };
  };


};


const products = new Product( productModel );

module.exports = products;