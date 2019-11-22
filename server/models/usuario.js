const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    edad: {
        type: Number,
        required: [true, "La edad es necesaria"],
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad es necesaria"],
    },
    direccion: {
        type: String,
        required: [true, "La dirección es necesario"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es necesario"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es necesaria"],
    }

})

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema);