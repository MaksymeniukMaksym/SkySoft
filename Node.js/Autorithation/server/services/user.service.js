const User = require('../models/user');

exports.createUser = async ({ name, password }) => {
	return await User.create({ name, password });
};

exports.getUser = async id => {
	return await User.findOne({
		where: id
	});
};
