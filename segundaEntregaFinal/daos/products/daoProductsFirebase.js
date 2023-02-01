const admin = require('firebase-admin')
const Container = require('../../container/firebaseContainer')


class Product extends Container {

  async add( doc ) {
    try{
      const db = admin.firestore()
      const res = await db.collection(this.collection).add(doc)
      console.log(`Agregado con exito. ID ${res.id}`);
      return;
    } catch(err) {
      console.log(`Error daoPF1: ${err}`);
      return;
    };
  };

  
  async modifyById( id, doc ) {  
    try {
      const db = admin.firestore();
      const ref = db.collection(this.collection).doc(id);
      await ref.update(
        { title: doc.title,
          description: doc.description,
          code: doc.code,
          price: doc.price,
          stock: doc.stock,
          thumbnail: doc.thumbnail
        }
      );
      console.log(`Elemento mofificado: ${id}`);
      return;
    } catch(err) {
      console.log(`Error daoPF2: ${err}`);
      return false;
    };
  };


}


const products = new Product('products');

module.exports = products;