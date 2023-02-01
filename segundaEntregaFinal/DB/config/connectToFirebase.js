const admin = require('firebase-admin');

const serviceAccount = require('../../licenses/firebaseLicense/firebaseLicense.json');

let isConected;

const connectToFirebase = async () => {
  if(!isConected) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://segundaentrega-d24cc.firebaseio.com'
    });
  console.log('Connected to Firebase');
  return;
  };

  console.log("Firebase existing connection");
  return;
};


module.exports = connectToFirebase;