const { RSA_NO_PADDING } = require('constants');
const path = require('path');
const Login = require('../models/usuarios');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');


// Por mejorar (no funciona :'c)
exports.login = function(req, res){
    var dueño = false;
    var email = req.body.email;
    var pass = req.body.password;
    console.log('email: '+email+" password: "+pass);

    Login.findOne({email:email},function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }else{
            if(pass == result.password)
            {
                res.redirect('/agenda/getagenda');
            }
            else
            {
                res.render('/login');
            }
            
        }
    });
}