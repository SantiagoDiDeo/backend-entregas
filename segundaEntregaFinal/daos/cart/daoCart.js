const connectToDd = require('../../DB/config/connectToMongo.js');
const Container = require('../../container/mongoContainer.js');
const { cartModel } = require('../../DB/model/modelMongoDb.js');


class Cart extends Container {

  async newCart( items ) {
    try{
      await connectToDd();
      const newCart = new cartModel(items);
      await newCart.save()
        .then(cart => console.log(`Agregado con exito. id: ${cart._id}`))
        .catch(err => console.log(`Error daoC1: ${err}`))
      return;
    } catch(err) {
      console.log(`Error daoC1: ${err}`);
    };
  };

  async addProduct( id, item ) { 
    try{
      await connectToDd()
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $push: { products: item }})
      return;
    } catch(err) {
      console.log(`Error daoC2: ${err}`);
    };
  };

  async deleteProduct( id, item ) { 
    try{
      await connectToDd();
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $pull: { products: item }})
      return;
    } catch(err) {
      console.log(`Error daoC3: ${err}`);
    };
  };

  async getArray( id ) {  
    try{
      await connectToDd();
      const cart = await this.schema.find(
        { _id: id },
        { products: 1})
      return  await cart.products;
    } catch(err) {
      console.log(`Error daoC4: ${err}`);
    };
  };


};


const carts = new Cart( cartModel );

module.exports = carts;