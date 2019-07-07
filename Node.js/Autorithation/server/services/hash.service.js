const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = async (password = null) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);

		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.log(error);
		return null;
	}
};

exports.comparePassword = async (password, hash) => {
	return bcrypt.compare(password, hash);
};
