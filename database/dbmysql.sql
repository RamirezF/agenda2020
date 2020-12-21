-- create database

create database agenda20202;

-- Using database
use agenda20202;

-- Create table contactos
create table contactos (
    id int AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(32),
    email varchar(32),
    telefono int(9)
);

-- Mostrar tablas
SHOW TABLES;

-- Describir la tabla

DESCRIBE contactos;