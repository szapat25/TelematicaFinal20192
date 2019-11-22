const express = require('express')
const router = express.Router()

const producto = require('../controllers/producto.controller');

// localhost:300/api/productos/
router.get('/', producto.getProductos)

// localhost:300/api/productos/
router.post('/', producto.createProducto)

// localhost:300/api/productos/:id
router.get('/:id', producto.getProducto)

// localhost:300/api/productos/:id
router.put('/:id', producto.updateProducto)

// localhost:300/api/productos/:id
router.delete('/:id', producto.deleteProducto)

module.exports = router;