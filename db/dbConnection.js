const { Sequelize } = require('sequelize');

const {DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const dbConnection = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging : false
});

dbConnection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

dbConnection.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = dbConnection;
