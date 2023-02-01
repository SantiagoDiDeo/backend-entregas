const mongoose = require('mongoose')

const connectToMongo = require('../config/connectToMongo.js')
const { Product, Cart } = require('../model/modelMongoDb.js')


const create = async () => {
  await connectToMongo()

  const newProduct = new Product(  {
    "title": "TV",
    "description": "Smart",
    "code": "5",
    "price": "4999",
    "stock": "3",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_tv_48px-256.png"
  })

  await newProduct.save()
    .then(product => console.log(`${product._id} has been added to the books collection.`))
    .catch(err => console.log(err))

  mongoose.disconnect()
}

create()