const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const path = require('path');

const port = process.env.port || 3000;

const app = express();

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretkey';

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
	try {
		const user = getUser({ id: jwt_payload.id });

		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
});

const rootRouter = require('./server/routes/index.js');
passport.use(strategy);

app.use(express.static(__dirname));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', rootRouter);

app.listen(port);
