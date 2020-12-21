const { RSA_NO_PADDING } = require('constants');
const Contactos = require('../models/contactos');
const Contacto = require('../models/contactos');
const Imagen = require('../models/imagen');
const fs = require('fs-extra');

const contact = new Contacto();
const img = new Imagen();

// Subida de imagen
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDI_NAME,
  api_key: process.env.CLOUDI_API_KEY,
  api_secret: process.env.CLOUDI_API_SECRET
})

exports.index = function (req, res) {
    contact.find("all", {}, (err, result) => {
        res.render('agenda/getagenda', {contactos: result});
    });
};

exports.create =async function (req, res) {
    const {nombre, email, telefono, fecha_naci } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const imgUrl = result.url;
    const public_id = result.public_id;
    const valor = await new Contacto({
        nombre: nombre, 
        email: email, 
        telefono: telefono, 
        imgUrl: imgUrl,
        public_id: public_id,
        fecha_naci: fecha_naci
    });
    valor.save();
    await fs.unlink(req.file.path);
    res.redirect('/agenda/getagenda');
};

exports.list = (req, res, next) => {
    contact.find("all", {}, (err, result) => {
        res.render('agenda/getagenda', {contactos: result});
    });
};
// solo 1
exports.detail = function(req,res){
    contact.find('all', { where: 'id = '+req.params.id }, (err, res1) => {
        res.render('agenda/getone', {contactos: res1});
    });
};

exports.delete = async function(req, res){
    let val_id = req.params.id;
    contact.remove('id = ' + val_id);
    res.redirect('/agenda/getagenda');
};

exports.edit = function(req, res){
    contact.find('all', { where: 'id = '+req.params.id }, (err, result) => {
        res.render('agenda/edit', {contactos: result});
    });
};

exports.update = function(req, res){
    let val_id= req.params.id;
    const funcion = new Contactos(req.body);
    funcion.set('id', val_id);
    funcion.save(); 
    res.redirect('/agenda/getone/'+val_id);
};

exports.editImage = async function(req, res){

    const val_id= req.params.id;
    const subida = await cloudinary.v2.uploader.upload(req.file.path);
    const imgpublic_id = subida.public_id;
    const imgurl = subida.url;
    
    const nueva_imagen = new Contacto({
        imgurl: imgurl,
        public_id: imgpublic_id
    });
    nueva_imagen.set('id', val_id);
    nueva_imagen.save();
    res.redirect('/agenda/getagenda');
};
