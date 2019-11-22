const mongoose = require('mongoose')
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es necesario"],
    },
    marca: {
        type: String,
        required: [true, "La marca es necesaria"],
    },
    imgUrl: {
        type: String,
        required: false,
    },
    precio: {
        type: Number,
        required: [true, "El precio es necesaria"],
    }
});


module.exports = mongoose.model('Producto', productoSchema);