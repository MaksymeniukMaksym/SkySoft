const jwt = require('jsonwebtoken');
const { getUser, createUser } = require('../services/hash.service');

exports.getHomePage = (req, res) => {
	res.render('home');
};

exports.getLoginPage = (req, res) => {
	res.render('login');
};

exports.getSignupPage = (req, res) => {
	res.render('signup');
};

exports.getUserName = (req, res) => {
	const { name } = req.user;
	res.json({ name });
};

exports.login = async (req, res) => {
	try {
		const { name, password } = req.body;

		if (name && password) {
			const user = await getUser({ name });

			if (!user) {
				throw new Error();
			}
			if (HashService.comparePassword(password, user.password)) {
				const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, {
					algorithms: ['SHA256']
				});

				res.json({
					token,
					status: true
				});
			} else {
				throw new Error();
			}
		} else {
			throw new Error();
		}
	} catch (error) {
		res.json({
			status: false
		});
	}
};

exports.signup = async (req, res) => {
	const { name, password } = req.body;

	if (!!name && !!password) {
		const hash = HashService.hashPassword(password);
		const user = await createUser({ name, password: hash });

		if (!!user) {
			const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, {
				algorithms: ['SHA256']
			});

			res.json({
				token
			});

			res.redirect('/home');
		} else {
			throw new Error();
		}
	} else {
		res.status(500).end();
	}
};

exports.logout = (req, res) => {
	res.redirect('/login');
};
