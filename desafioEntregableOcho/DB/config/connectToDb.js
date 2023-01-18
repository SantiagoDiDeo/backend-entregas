const knex = require('knex');

const mariaDb = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'ecommerce'
    }
  });

  const sqlite3 = knex({
    client: 'sqlite3',
    connection: {filename: '/absolutepath/db.sqlite'},
    useNullAsDefault: true
  });

module.exports = { mariaDb, sqlite3 };  
  