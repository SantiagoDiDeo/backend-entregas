const admin = require('firebase-admin');
const Container = require('../../container/firebaseContainer');



class Cart extends Container {

  async newCart( doc ) {
    try{
      const db = admin.firestore();
      const res = await db.collection(this.collection).add(doc);
      console.log(`Carrito agregado. ID ${res.id}`);
      return
    } catch(err) {
      console.log(`Error daoF1: ${err}`);
    }
  }

  async addItem( id, item ) {
    try{
      const db = await admin.firestore();
      const docRef = await db.collection(this.collection).doc(id);
      docRef.get()
        .then( async doc => {
          await docRef.update({ products: [...doc.get('products'), item]});
        });
      return;
    } catch(err) {
      console.log(`Error daoF2: ${err}`);
    };
  };

  async deleteItem( id, item ) { 
    try{
      const db = admin.firestore();
      const docRef = db.collection(this.collection).doc(id);
      await docRef.update({
        products: admin.firestore.FieldValue.arrayRemove(item)
      });
      return;
    } catch(err) {
      console.log(`Error daoF3: ${err}`);
    };
  };

  async getArray( id ) {  
    try{
      const db = admin.firestore();
      const docRef = db.collection(this.collection).doc(id);
      let array;
      await docRef.get()
        .then( async doc => {
          array =  await doc.get('products');
        });
     return array;
    } catch(err) {
      console.log(`Error daoF4: ${err}`);
    };
  };


};


const carts = new Cart('carts');

module.exports = carts;