//Ahora si viene lo chiiido! brah!
'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
mongoose.connect('mongodb://localhost:27017/portafolio',  { useNewUrlParser: true })
    .then(()=>{
        console.log('Se conecto a la base de datos');

        //Creacion del servidor
        app.listen(port, ()=>{
            console.log(`Servidor corriendo en el puerto ${port}`)
        });
    })
    .catch(err => console.log(err));