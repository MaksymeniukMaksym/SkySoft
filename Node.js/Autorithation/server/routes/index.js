const router = require('express').Router();
const passport = require('passport');

const {
	getHomePage,
	getLoginPage,
	getUserName,
	getSignupPage,
	login,
	logout,
	signup
} = require('../controllers/auth');

router.get('/home', passport.authenticate('jwt', { session: false }), getHomePage);

router.get('/getUserName', passport.authenticate('jwt', { session: false }), getUserName);

router.get('/login', getLoginPage);

router.get('/signup', getSignupPage);

router.get('/logout', logout);

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;
