const mongoose = require('mongoose')

let URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bd-vaso';

mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

module.exports = mongoose;