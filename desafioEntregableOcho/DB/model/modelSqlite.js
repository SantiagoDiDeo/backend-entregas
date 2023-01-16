const { sqlite3 } = require('../config/conectToDb')

const createTableSqlite = async () => {
  try {
    await sqlite3.schema.dropTableIfExists('chat')
    await sqlite3.schema.createTable('chat', table => {
      table.increments('id')
      table.string('user', 30).notNullable()
      table.string('message', 100).notNullable()
      table.timestamp('date')
    })
    console.log('Table created')
  } catch (err) {
    console.error(`No se ha podido crear la tabla`, err.message)
  }
}

module.exports = { createTableSqlite }