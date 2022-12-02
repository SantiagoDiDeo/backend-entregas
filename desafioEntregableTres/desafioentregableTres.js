const fs = require('fs');
const express = require('express');
const app = express();
const routeTxt = 'productos.txt';
class Productos {
    constructor(file) {
        this.file = file;
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

    async getProductRandom() {
        const products = await this.getArray();

        try {
        const randomIndex = Math.trunc(Math.random() * products.length);
        const item = products[randomIndex];
        return item;

        } catch (err) {
            console.log(new Error(err));
        };
      };
    };


const productos = new Productos(routeTxt);

app.get('/productos', async (req, res) => {
    const productArray =  await productos.getArray();

    res.json(productArray);
});

app.get('/productoRandom', async (req, res) => {
    
    const getRandom = await productos.getById();
    const randomProduct = await productos.getProductRandom(getRandom);
    res.json(randomProduct);
});

const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`listening in port ${PORT}`);
});