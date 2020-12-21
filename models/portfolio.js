const mongoose = require('mongoose');
const { model } = require('./usuarios');
const Schema = mongoose.Schema;

const Portfolio = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
});

module.exports = mongoose.model('Portfolio',Portfolio);