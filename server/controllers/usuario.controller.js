const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt')
const _ = require('underscore')

const usuarioCtrl = {}


usuarioCtrl.getUsuarios = (req, res) => {
    restricciones = {}
    Usuario.find(restricciones, 'nombre edad ciudad direccion email')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            res.json({
                ok: true,
                usuarios,
            })
        })
}

usuarioCtrl.createUsuario = (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        edad: body.edad,
        ciudad: body.ciudad,
        direccion: body.direccion,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        })
    })

}


usuarioCtrl.getUsuario = (req, res) => {

    let id = req.params.id

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            usuario,
        })


    })
}

usuarioCtrl.updateUsuario = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const usuario = {
        nombre: body.nombre,
        edad: body.edad,
        ciudad: body.ciudad,
        direccion: body.direccion,
        password: bcrypt.hashSync(body.password, 10),
    }
    Usuario.findByIdAndUpdate(id, usuario, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        })

    })


}

usuarioCtrl.deleteUsuario = (req, res) => {
    Usuario.findByIdAndRemove(req.params.id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado',
                }
            })
        }

        res.json({
            ok: true,
            message: "Usuario borrado exitosamente"
        })
    })
}

usuarioCtrl.loginUsuario = (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos',
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos',
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        })

    })
}


module.exports = usuarioCtrl;