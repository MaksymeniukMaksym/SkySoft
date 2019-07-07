const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	database: 'node_db',
	username: 'maks',
	password: 'Maks3226',
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(() => console.log('Database ON.'))
	.catch(err => console.error('Not conect to Datebase', err));

module.exports = sequelize;
