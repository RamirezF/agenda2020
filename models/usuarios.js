const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarios = new Schema ({
        nombre: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
});

module.exports = mongoose.model('usuarios', usuarios);