const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const { mongoose } = require('./database')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/usuarios', require('./routes/usuario.routes'))
app.use('/api/productos', require('./routes/producto.routes'))
app.use('/api/comentarios', require('./routes/comentario.routes'))


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})