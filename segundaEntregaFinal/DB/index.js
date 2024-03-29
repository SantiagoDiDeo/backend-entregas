
const { mariaDb } = require("./config/connectToSql");
const { createTableMaria } = require('./model/modelMariaDb')

const executeOperations = async () => {
    try {
       await createTableMaria();
    } catch (err) {
        console.log(new Error(err));
    } finally {
        mariaDb.destroy();
    };
};

executeOperations();