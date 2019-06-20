const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const rand = require('csprng');
const Sequelize = require('sequelize');
const CryptoJS = require('crypto-js');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretkey';

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

const app = express();

app.use(express.static(__dirname));

passport.use(strategy);

app.use(passport.initialize());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));




const sequelize = new Sequelize({
    database: 'node_db',
    username: 'maks',
    password: 'Maks3226',
    dialect: 'mysql',
});


sequelize
    .authenticate()
    .then(() => console.log('Database ON.'))
    .catch(err => console.error('Not conect to Datebase', err));

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING,
    },
});
const urlencodedParser = bodyParser.urlencoded({ extended: false });

User.sync()
    .then(() => console.log('\"user\" table created '))
    .catch(err => console.log('wrong database'));

const createUser = async ({ name, password, salt }) => {
    return await User.create({ name, password, salt });
};

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

let UserOnSession = {
    name: null,
    token: null
};

app.get("/register", urlencodedParser, function (req, res) {
    res.sendFile(__dirname + "/html/register.html");
});

app.get("/login", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/html/index.html");
});
app.get('/home', function (req, res) {
    if (UserOnSession.token != null) {
        let content = fs.readFileSync(__dirname + '/html/main.html', 'utf-8');
        content = content.replace('%username%', UserOnSession.name);
        res.setHeader('Content-Type', 'text/html');
        res.send(content);
    }
    else {
        res.redirect('/login');
    }
});



app.post('/register', function (req, res, next) {
    let salt = rand(160, 36);
    req.body.password = CryptoJS.SHA256(req.body.password + salt).toString();
    const { name, password } = req.body;
    createUser({ name, password, salt }).then(user =>
        res.redirect('/home'));
});

app.post('/login', async function (req, res, next) {
    const { name, password } = req.body;
    if (name && password) {
        let user = await getUser({ name: name });

        if (user) {
            if ((CryptoJS.SHA256(password + user.salt).toString()) === user.password) {
                let payload = { id: user.id };
                UserOnSession.token = jwt.sign(payload, jwtOptions.secretOrKey);
                UserOnSession.name = req.body.name;
                console.log({ msg: 'ok', token: UserOnSession.token });
                res.redirect("/home");
            }
        }
    }
});

app.get('/logout', function (req, res) {
    UserOnSession.token = null;
    UserOnSession.name = null;
    res.redirect("/login")
});


app.listen(3000);