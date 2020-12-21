const conn = require('../mysql');

const Imagen = conn.extend({
        tableName: 'photo_image'
});

module.exports = Imagen;