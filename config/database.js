const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('solarpets', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});
module.exports = { sequelize };