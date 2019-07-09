const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../services/hash.service');
const { getUser, createUser } = require('../services/user.service');

const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretkey';

exports.getHomePage = (req, res) => {
	res.render('home.html');
};

exports.getLoginPage = (req, res) => {
	res.render('login.html');
};

exports.getSignupPage = (req, res) => {
	res.render('signup.html');
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
			console.log(password);
			console.log(user.password)
			console.log(await comparePassword(password, user.password));
			if (await comparePassword(password, user.password)) {
				const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
				console.log('done')
				
				res.json({
					token,
					status: true,
					redirect: "home"
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
		const hash = await hashPassword(password);
		const user = await createUser({ name, password: hash });

		if (user) {
			const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey );
			
			res.redirect('/login');
			res.json({
				token
				});
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
