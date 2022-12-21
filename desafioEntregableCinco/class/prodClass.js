const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    };
    
    async saveFile (file, products) {

      try {
        await fs.promises.writeFile(
          file, JSON.stringify(products, null, 2)
          );
      } catch(err) {
        console.log(new Error(err));
      };
    };
  
    async getArray() {
        try {
            const products = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(products);
        } catch (err) {
            console.log(new Error(err));
        };
    };

    async getById(id) {
        const products = await this.getArray();
    
        try {
          const object = products.find(prod => prod.id === id);
          return object ? object : null;

        } catch(err) {
          console.log(new Error(err));
        };
      };

      async save(product) {
        const objects = await this.getArray();
    
        try {
            let newId;
            objects.length === 0 || objects.length === undefined ? newId = 1 : newId = objects[ objects.length - 1].id + 1;
            
            const newObject = {...product, id: newId}; 
    
            objects.push(newObject);        
    
            await this.saveFile(this.file, objects);
    
            return newId;
    
        } catch(err) {
          console.log(new Error(err));
        };
      };
    
    };

module.exports = Contenedor;