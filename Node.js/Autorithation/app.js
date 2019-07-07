const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const CryptoJS = require('crypto-js');

const port = process.env.port || 3000;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretkey';



let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {

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

const app = express();

app.use(express.static(__dirname));

passport.use(strategy);

app.use(passport.initialize());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));




sequelize
  .authenticate()
  .then(() => console.log('Database ON.'))
  .catch(err => console.error('Not conect to Datebase', err));


const urlencodedParser = bodyParser.urlencoded({ extended: false });

User.sync()
  .then(() => console.log('\"user\" table created '))


app.get("/register", urlencodedParser, (req, res) => {
  res.sendFile(__dirname + "/html/register.html");
});

app.get("/login", urlencodedParser, (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
app.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {

  console.log(req.user);
 
  res.end();
   

});



app.post('/register', function (req, res, next) {
  let salt = 10;
  req.body.password = CryptoJS.SHA256(req.body.password + salt).toString();
  const { name, password } = req.body;
  createUser({ name, password, salt }).then(user =>
    res.redirect('/home'));
});

app.post('/login', async function (req, res, next) {
  try {
    const { name, password } = req.body;

    if (name && password) {
      const user = await getUser({ name });

      if (!user) {
        throw new Error();
      }
      if (CryptoJS.SHA256(password + user.salt).toString() === user.password) {
        console.log({ msg: 'ok', token: localStorage.getItem('token') });

        const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey, { algorithms: ['SHA256'] });

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
});

app.get('/logout', function (req, res) {
  res.redirect("/login")
});


app.listen(port);