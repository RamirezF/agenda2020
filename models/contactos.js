const conn = require('../mysql');

const Contactos = conn.extend({
        tableName: 'contactos'
});

module.exports = Contactos;