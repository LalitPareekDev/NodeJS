const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    p_name: {
        type: String,
        required: true
    },
    category :{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model('productSchema', schema);