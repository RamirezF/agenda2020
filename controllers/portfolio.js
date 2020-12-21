const { RSA_NO_PADDING } = require('constants');
const path = require('path');
const AWS = require('aws-sdk');
const portfolio = require('../models/portfolio');
const fs = require('fs');
const { format } = require('path');

const logger = require('../utils/logger');


const s3 = new AWS.S3({
    accessKeyId: "ASIAY3PVVCODVBSLGCD2",
    secretAccessKey: "tC7u1qDs0q+ebAwqNzE3idYsmNtfg1+HsLvsPS9d",
    sessionToken: "FwoGZXIvYXdzEPb//////////wEaDENbTs0750O6H/fzDCLOAUtMmFS/mZ5YizUWAZpoLyEOXNWe7AKax6KpxvOFcIdCZIgF+nTN7Fr1DxEpLXtRSqQPDQoe2pGJ05CyPz/fvZzs+FOZ98fsx4n7vdxM6VD6vYY5LM+RR5tH/llX8p4kcHPcAsW+VRPPyFvo3M491Bmy0W98QPp2BgfHo8XuHx84vOM+uVa54iPehgpsF7HAD4af7Lb3PRgvNItRCsz07E04ZGIyR3h6X5XkW9+8VDOWfWmtcR6khzXFeLWn6owz+lNokVWNxHHZEYiZJ7a1KKiRyv4FMi0XPxHa2D6YrbclQNvQWvLDUiZMLcco88sWVc/prYgkoVcZiPb/RCczCIyLX9w=",
});

exports.index = function(req, res){
    res.render('portfolio');
};

exports.add = function(req,res){
    res.render('portfolio/create');
};

exports.upload = function(req, res){
    logger.info(req.body);
    res.send(req.body);
};

exports.list = function(req, res){
    res.render('portfolio/getportfolio');
}

exports.detail = function(req,res){
    res.render('portfolio/getone');
}

exports.delete = function(req,res){
    res.send('Eliminará la imagen');
}