const { mariaDb} = require("../config/connectToSql");


const createTableMaria = async () => {
    try {
        await mariaDb.schema.dropTableIfExists('products');
        await mariaDb.schema.createTable('products', (table) => {
            table.increments('id')
            table.string('title', 30).notNullable();
            table.integer('price')
            table.string('thumbnail', 1000).notNullable();
        });
        console.log('table created succesfuly');
    } catch(err){ 
        console.log('something wrong happend', err.message);
    }
};

module.exports = { createTableMaria };
