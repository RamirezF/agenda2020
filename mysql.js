const mysql = require('mysql-model');
const conn = mysql.createConnection(
    {
        host: process.env.BD_HOST,
        user: process.env.BD_USER,
        password: '',
        database: process.env.BD_DATABASE
    }
);

module.exports = conn;

/*

USE agenda2020;

CREATE TABLE contactos(
	id int AUTO_INCREMENT PRIMARY KEY,
   nombre varchar(32),
   email varchar(32),
   telefono int(9),
   imgurl VARCHAR(128) NOT NULL,
   public_id VARCHAR(128) NOT NULL);

*/