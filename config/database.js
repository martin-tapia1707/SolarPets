const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('solarPets', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});
module.exports = { sequelize };