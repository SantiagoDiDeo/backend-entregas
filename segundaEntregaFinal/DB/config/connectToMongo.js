const mongoose = require('mongoose');

let isConnected;

const connectToMongo = async () => {
    if (!isConnected) {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        isConnected = true;
        console.log('MongoDb connected');
        return;
    } else {
        console.log('MongoDb existing connection');
    return;
};
    
};

module.exports = connectToMongo;
