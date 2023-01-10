const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Contanier {

    constructor( file ) {
        this.file = file;
    };
  
    
    async getArray() {
      try{
        const products = await fs.promises.readFile( this.file, 'utf-8');
        return JSON.parse(products);

      } catch(err) {
        console.log(`Error1: ${err}`);
      };
    };
   
    async saveFile ( products ) {
      try {
        await fs.promises.writeFile(
          this.file, JSON.stringify( products, null, 2 )
          );
      } catch(err) {
        console.log(`Error2: ${err}`);
      };
    };
  
  
    async save( product ) {
      const products = await this.getArray();
      try{
          const idNew = uuidv4();
          const productNew = { id: idNew, timestamp: new Date().toLocaleString(), ...product };       
          products.push(productNew);
          await this.saveFile( products );
          return idNew;
  
      } catch(err) {
        console.log(`Error3: ${err}`);
      };
    };
  
  
    async getById( id ) {
      const products = await this.getArray();
      try {
        const product = products.find( ele => ele.id === id);
        return product ? product : null;
  
      } catch(err) {
        console.log(`Error4: ${err}`);
      };
    };

    async addCart( cartId ) { 
      const carts = await this.getArray();
      try{
          const newCart = { timestamp:new Date().toLocaleString(), id: cartId };     
          await this.saveFile( carts );
          carts.push({newCart});
          return;
      } catch(err) {
        console.log(`Error5: ${err}`);
      };
    };
  
  
    async deleteById( id ) {
      let products = await this.getArray();
      
      try {
        products = products.filter( ele => ele.id != id );
        await this.saveFile( products );
      
      } catch(err) {
        console.log(`Error6: ${err}`);
      };
    };
  
  
    async deleteAll() {
      await this.saveFile(this.file, []);
    };
  
  };

const products = new Contanier('./data/products.txt');
const carts = new Contanier('./data/cart.txt');

module.exports =  {products, carts};
