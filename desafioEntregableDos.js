const fs = require ('fs');

class Contenedor {

  constructor(file) {
      this.file = file
  };

  async getFile() {
        
    try {
      const products = await fs.promises.readFile( this.file, 'utf-8');
      return JSON.parse(products);

    } catch(err) {
      console.log(new Error(err));
    };
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

  async save(object) {
    const objects = await this.getFile();

    try {
        let newId;
        objects.length === 0 || objects.length === undefined ? newId = 1 : newId = objects[ objects.length - 1].id + 1;
        
        const newObject = {...object, id: newId}; 

        objects.push(newObject);        

        await this.saveFile(this.file, objects);

        return newId;

    } catch(err) {
      console.log(new Error(err));
    };
  };


  async getById(id) {
    const objects = await this.getFile();

    try {
      const object = objects.find(prod => prod.id === id);
      return object ? object : null;

    } catch(err) {
      console.log(new Error(err));
    };
  };


  async deleteById(id) {
    let objects = await this.getFile();
    
    try {
      objects = objects.filter(prod => prod.id != id);
      await this.saveFile(this.file, objects);
    
    } catch(err) {
      console.log(new Error(err));
    };
  };


  async deleteAll() {

    await this.saveFile(this.file, []);
  };

};



const productos = new Contenedor('productos.txt')

const test = async() => {
  try {
    
    //getFile
    let products = await productos.getFile();
    
    //save
    await productos.save(
        { 
            "title": "Banana",
            "price": 90,
            "thumbnail": "urlBanana"
        }
    );
    products = await productos.getFile();
    
    await productos.save(
        { 
            "title": "Apple",
            "price": 75,
            "thumbnail": "urlApple"
        }
    )
    products = await productos.getFile();
    
    console.log(`getAll: ${JSON.stringify(products, null, 2)}`);
    

    //getById
    let getId = await productos.getById(1);

    console.log(`getById ${JSON.stringify(getId)}`);

    getId = await productos.getById(2);
    
    console.log(`getById ${JSON.stringify(getId)}`);

    
    // //deleteById
    await productos.deleteById(2);
    products = await productos.getFile();
    console.log(`deleteById ${JSON.stringify(products)}`);


    // //deleteAll
    await productos.deleteAll();
    products = await productos.getFile();
    console.log(`deleteAll: ${JSON.stringify(products, null, 2)}`);


  } catch(err) {
    console.log(new Error(err));
  };
};


test();