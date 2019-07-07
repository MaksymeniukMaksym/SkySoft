const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'node_db',
    username: 'maks',
    password: 'Maks3226',
    dialect: 'mysql',
});

module.exports = sequelize;