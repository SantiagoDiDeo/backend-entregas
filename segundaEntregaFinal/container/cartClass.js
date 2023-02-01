const fs = require ('fs');


class Cart {
  constructor( file ) {
      this.file = file;
  };


  async getArray() {
    try{
      const cart = await fs.promises.readFile( this.file, 'utf-8');
      const jsonCart = JSON.parse(cart);
      return jsonCart.products;
    } catch(err) {
      console.log(`Error6: ${err}`);
    };
  };
 
  
  async saveFile ( cart ) {
    try {
      await fs.promises.writeFile(
        this.file, JSON.stringify( cart, null, 2 )
        );
    } catch(err) {
      console.log(`Error7: ${err}`);
    };
  };


  async add( idProduct ) {
    const products = await this.getArray();
    try{   
        products.push( idProduct );   
        await this.saveFile( products );
        return;

    } catch(err) {
      console.log(`Error8: ${err}`);
    };
  };

  async deleteById( id ) {
    let products = await this.getArray();
    try {
      products = products.filter( ele => ele.id != id );
      await this.saveFile( products );
    
    } catch(err) {
      console.log(`Error9: ${err}`);
    };
  };
};

module.exports = Cart;