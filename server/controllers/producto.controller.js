const Producto = require('../models/producto');

const bcrypt = require('bcrypt')
const _ = require('underscore')

const productoCtrl = {}


productoCtrl.getProductos = (req, res) => {
    restricciones = {}
    Producto.find(restricciones, 'nombre marca precio imgUrl')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            res.json({
                ok: true,
                productos,
            })
        })
}

productoCtrl.createProducto = (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        marca: body.marca,
        imgUrl: body.imgUrl,
        precio: body.precio,
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            producto: productoDB,
        })
    })

}


productoCtrl.getProducto = (req, res) => {

    let id = req.params.id

    Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            })
        }

        res.json({
            ok: true,
            producto,
        })


    })
}

productoCtrl.updateProducto = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const producto = {
        nombre: body.nombre,
        marca: body.marca,
        imgUrl: body.imgUrl,
        precio: body.precio,
    }
    Producto.findByIdAndUpdate(id, producto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
        })

    })


}

productoCtrl.deleteProducto = (req, res) => {
    Producto.findByIdAndRemove(req.params.id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado',
                }
            })
        }

        res.json({
            ok: true,
            message: "Producto borrado exitosamente"
        })
    })
}

module.exports = productoCtrl;