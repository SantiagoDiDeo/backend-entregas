const admin = require('firebase-admin');


const getCollection = ( col ) => {
  try{
    const db = admin.firestore();
    return db.collection(col);
  } catch(err) {
    console.log(`Error fb1: ${err}`);
  };

};

const firebaseToArrayMongo = ( fbArray ) => { 
  const mongoArray = [];
  fbArray.forEach( ele => {
    mongoArray.push({_id: ele.id, ...ele.data()});
  });
  return mongoArray;
};



class Container {

  constructor( collection ) {
      this.collection = collection;
  };
  

  async getArray() {
    try{
      const allItems = await getCollection(this.collection).get();
      return firebaseToArrayMongo(allItems);
    } catch(err) {
      console.log(`Error fb2: ${err}`);
    };
  };
 

  async getById( id ) {
    try {
      const doc = await getCollection(this.collection).doc(id).get();
      if (!doc.exists) {
        console.log('ID inexistente.');
      } else {
        return [doc.data()];
      };
      return null;

    } catch(err) {
      console.log(`Error fb3: ${err}`);
    };
  };


  deleteById( id ) {  
    try {
      getCollection(this.collection).doc(id).delete();
      return;
    } catch(err) {
      console.log(`Error fb4: ${err}`);
      return false;
    };
  };


  async deleteAll() {
    try {
      getCollection(this.collection).get().then( query => {
        query.forEach( doc => { doc.ref.delete()});
      });
      return; 
    } catch(err) {
      console.log(`Error fb5: ${err}`);
      return false;
    };
  };

};


module.exports = Container;