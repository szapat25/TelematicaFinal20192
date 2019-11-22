const Comentario = require('../models/comentario');

const bcrypt = require('bcrypt')
const _ = require('underscore')

const comentarioCtrl = {}


comentarioCtrl.getComentarios = (req, res) => {
    restricciones = {}
    Comentario.find(restricciones, 'nombreCliente emailCliente mensaje productosSeleccionados calificacion')
        .exec((err, comentarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            res.json({
                ok: true,
                comentarios,
            })
        })
}

comentarioCtrl.createComentario = (req, res) => {

    let body = req.body;

    let comentario = new Comentario({
        emailCliente: body.emailCliente,
        mensaje: body.mensaje,
        productosSeleccionados: body.productosSeleccionados,
        calificacion: body.calificacion,
    })

    comentario.save((err, comentarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            comentario: comentarioDB,
        })
    })

}


comentarioCtrl.getComentario = (req, res) => {

    let id = req.params.id

    Comentario.findById(id, (err, comentario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            comentario,
        })


    })
}

comentarioCtrl.updateComentario = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const comentario = {
        emailCliente: body.emailCliente,
        mensaje: body.mensaje,
        productosSeleccionados: body.productosSeleccionados,
        calificacion: body.calificacion,
    }
    Comentario.findByIdAndUpdate(id, comentario, { new: true, runValidators: true }, (err, comentarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            comentario: comentarioDB,
        })

    })


}

comentarioCtrl.deleteComentario = (req, res) => {
    Comentario.findByIdAndRemove(req.params.id, (err, comentarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!comentarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Comentario no encontrado',
                }
            })
        }

        res.json({
            ok: true,
            message: "Comentario borrado exitosamente"
        })
    })
}

module.exports = comentarioCtrl;