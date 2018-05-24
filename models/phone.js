const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    name: String,
    brand: String,
    price: Number,
    img: Array
});

const Phones = mongoose.model('Phones', phoneSchema);

module.exports = Phones;