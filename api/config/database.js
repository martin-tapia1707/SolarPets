const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('solarpets', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00' // pone la hora argentina porque POR ALGUNA RAZON MYSQL LA GUARAD +3 HROAS DESPUES
});
module.exports = { sequelize };