const express = require('express')
const router = express.Router()

const usuario = require('../controllers/usuario.controller');

// localhost:300/api/usuarios/
router.get('/', usuario.getUsuarios)

// localhost:300/api/usuarios/
router.post('/', usuario.createUsuario)

// localhost:300/api/usuarios/:id
router.get('/:id', usuario.getUsuario)

// localhost:300/api/usuarios/:id
router.put('/:id', usuario.updateUsuario)

// localhost:300/api/usuarios/:id
router.delete('/:id', usuario.deleteUsuario)

// localhost:300/api/usuarios/login
router.post('/login', usuario.loginUsuario)

module.exports = router;