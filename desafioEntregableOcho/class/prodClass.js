const knex = require('knex');

class Contenedor {
    constructor(config, dBTable) {
        this.config = config;
        this.dBTable = dBTable;
    };
  
    async getArray() {
        try {
            const productsDb = await knex(this.config).from(this.dBTable).select('*');
            knex(this.config).destroy(); 
            return productsDb;
        } catch (err) {
            console.log(new Error(err));
        };
    };

    async addProduct(product) {
      try {
        await knex(this.config)(this.dBTable).insert(product);
        knex(this.config).destroy();
          return;
      } catch (err) {
        console.log(new Error(err));
      };
    };

    async getById(id) {

      try {
          const products = await knex(this.config).select('title', 'price', 'thumbnail').from(this.dBTable).were('id', id).first();
    
          return products ? produts : null;

        } catch(err) {
          console.log(new Error(err));
        };
      };

      async adjustById (id, product) {
        try {
          const selectedId = await knex(this.config)(this.dBTable).where('id', id).count();

         if (selectedId[0]['count(*)'] > 0){
        await knex(this.config)(this.dbTable).where('id', id).update( product );
        knex(this.config).destroy();
        return true;
      } else {
        knex(this.config).destroy()
        return false;
      }
    } catch(err) {
      console.log(new Error(err));
      return false;
    };
  };

      async delById(id) {
        try {
          const selectedId = await knex(this.config)(this.dBTable).where('id', id).count();

         if (selectedId[0]['count(*)'] > 0){
        await knex(this.config)(this.dbTable).where('id', id).update( product );
        knex(this.config).destroy();
        return true;
         }else {
          knex(this.config).destroy();
          return false;
         }

        }catch(err) {
          console.log(new Error(err));
          return false;
        };
      };

      async delAll() {
        await knex(this.config)(this.dBTable).del();
      };
    
    };

    const chat = new Contenedor( 
      {
          client: 'sqlite3',
          connection: { filename: './db/sqlite3db/ecommerce.sqlite' },
          useNullAsDefault: true
      },
      'chat'
    )
    
    const products = new Contenedor(
      {
          client: 'mysql',
          connection: {
            host: '127.0.0.1',
            user: 'root',
            database: 'ecommerce'}
      },
      'products'
    )

module.exports = {products, chat};