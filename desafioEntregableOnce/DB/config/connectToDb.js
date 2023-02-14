const MongoStore = require('connect-mongo');
const express = require('express');
const session = require('express-session');
const app = express();

let isConnected;

const connectToDb = async () => {
  if(!isConnected) {
    await app.use(session({
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://santiagodideo:desafio@cluster0.4aurmdl.mongodb.net/?retryWrites=true&w=majority',}),
        secret: 'secreto1',
        cookie: {maxAge: 60000},  
        resave: true,
        saveUninitialized: true,
      }))
    
          isConected = true;
          console.log('MongoAtlasDB Connected')
           
    return;
  } else {
    
    console.log("Conexion existente");
    return;
  };
};


module.exports = connectToDb 