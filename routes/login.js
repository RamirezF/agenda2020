const express = require('express');
const router = express.Router();
const path = require('path');
const model = require('../models/usuarios');
const usuarios = require('../controllers/usuarios');

router.use (function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/',function(req,res){
  res.sendFile(path.resolve('views/login/index.html'));
});

router.post('/', function(req, res){
  usuarios.login(req,res);
})

module.exports = router;