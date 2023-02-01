const connectToMongo = require('../DB/config/connectToMongo.js');

class Container {
        constructor(schema) {
        this.schema = schema;
    };

async getArray() {
    try{
        await connectToMongo();
        const productsDb =  await this.schema.find({});
        return productsDb;
    } catch(err) { 
        console.log(`Error mongo1: ${err}`);    
    };  
};


  async modifyById( id, item ) { 
    try {
      await connectToDd()
      await this.schema.findOneAndUpdate(
        { _id: id },
        { $set: {...item}})
    } catch(err) {
      console.log(`Error mongo2: ${err}`);
      return false;
    };
  };




async getById( id ) {
    try {
      await connectToDd();
      const documentInDb = await this.schema.find({_id: id});
      return documentInDb ? documentInDb : null;

    } catch(err) {
      console.log(`Error mongo3: ${err}`);
    };
  };


  async deleteById( id ) {  
    try {
      await connectToDd();
      await this.schema.deleteOne({ _id: id });
      return; 
    } catch(err) {
      console.log(`Error mongo4: ${err}`);
      return false;
    };
  };


  async deleteAll() {
    try {
      await connectToDd();
      await this.schema.deleteMany();
      return;
    } catch(err) {
      console.log(`Error mongo5: ${err}`);
      return false;
    };
  };



};

module.exports = Container;