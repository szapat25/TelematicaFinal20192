const express = require('express')
const router = express.Router()

const comentario = require('../controllers/comentario.controller');

// localhost:300/api/comentarios/
router.get('/', comentario.getComentarios)

// localhost:300/api/comentarios/
router.post('/', comentario.createComentario)

// localhost:300/api/comentarios/:id
router.get('/:id', comentario.getComentario)

// localhost:300/api/comentarios/:id
router.put('/:id', comentario.updateComentario)

// localhost:300/api/comentarios/:id
router.delete('/:id', comentario.deleteComentario)

module.exports = router;