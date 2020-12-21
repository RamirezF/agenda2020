const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const pata = require('path');

require('dotenv').config();
//const db = require('./db');
// nueva base de datos
const agenda = require('./routes/agenda');
const login = require('./routes/login');
const portfolio = require('./routes/portfolio');



const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const logger = require('./utils/logger');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'image/*', limit: '1mb'}))
app.use(morgan('short',  {
  stream: {
    write: message => logger.info(message.trim())
  }
}));
// Código para imágenes
const storage = multer.diskStorage({
  destination: pata.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime()+ pata.extname(file.originalname));
  }
})
app.use(multer({storage}).single('image'))


// Código para Login
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser('tecsup'));
app.use(session({
  secret:'tecsup',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(function(username, password, done){
  //done(err,{"Francisco"})
  if(username=="francisco.ramirez@tecsup.edu.pe" && password=="tecsup")
    return done(null,{id: 1, name:"Francisco"});
  
  done(null, false);
}));

//serialización
passport.serializeUser(function(user, done){
  done(null, user.id);
});

// deserialización
passport.deserializeUser(function(id,done){
  done(null, {id: 1, name: "Francisco"});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/login', passport.authenticate('local',{
  successRedirect: '/agenda/getagenda',
  failureRedirect: '/login'
}));

const path = __dirname + '/views/';
const port = 3000;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// para imagen
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
app.use('/agenda', agenda);
//app.use('/login', login);
app.use('/portfolio', portfolio);

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});