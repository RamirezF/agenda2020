const express = require('express');
const router = express.Router();
const path = require('path');
const portfolio = require('../controllers/portfolio');
const logger = require('../utils/logger');

router.get('/', function(req, res){
    portfolio.index(req,res);
});

router.get('/create', function(req,res){
    portfolio.add(req,res);
});

router.post('/addImage', function(req, res){
    portfolio.upload(req,res);
});

router.get('/getportfolio', function(req,res){
    portfolio.list(req,res);
});

router.get('/getone', function(req, res){
    portfolio.detail(req,res);
});

router.put('/:id/imagen', (req, res) => {
    logger.info("request para subir imagen", req.body)
    res.json({ url:"blablabla "})
});


module.exports = router;