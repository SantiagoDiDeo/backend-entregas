/* 
>> Consigna:
1) Realizar un proyecto de servidor basado en node.js que utilice el médulo express e
implemente los siguientes endpoints en el puerto 8080:
a) Ruta get '/productos' que devuelva un array con todos los productos disponibles
en el servidor.
b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos
los productos disponibles.

2) Incluir un archivo de texto 'productos.ixt' y utilizar la clase Contenedor del desafio
anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el
ejemplo del desafio anterior. CODER HOUSE.
*/



const fs = require('fs');
const express = require('express');
const app = express();


class Productos {
    constructor(file) {
        this.file = file;
    };

    async getArray() {
        try {
            const products = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(products)
        } catch (err) {
            console.log(err)
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
         object = await this.getArray();   

    }

}

const productos = new Productos('productos.txt')

const saveProducts = async() => {

    try {
        let products = await productos.getArray();
        await productos.save([
            {
                "title": "Escuadra",
                "price": 123.45,
                "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                "id": 1
              }
            ]);

            products = await productos.getArray();
    }catch (err) {
        console.log(err);
    };

};

saveProducts();

app.get('/productos', (req, res) => {
       
    res.json({productos})
})

const PORT  = 8080;
app.listen(PORT, (req, res) => {
    console.log(`listening in port ${PORT} `);
});