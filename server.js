//server.js

//referenciando las librerias
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

//conectando a la base datos
mongoose.connect('mongodb://localhost/Ventas',function(err){
	if (err) {
		console.log('Error al conectar a la base datos');
	}
	else {
		console.log('Conexion correcta');
	}
});

//creando el esquema para la coleccion usuarios
var usuarioEsquema = mongoose.Schema({
	usuario:{type:String,unique:true},
	clave:String
});

//creando la coleccion
var Usuario = mongoose.model('usuarios',usuarioEsquema);

//implementando el servicio express
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//implementando el ruteo
var router = express.Router();
router.route('/usuarios').post(function(req,res) {
	var miUsuario = new Usuario();
	miUsuario.usuario = req.body.usuario;
	miUsuario.clave = req.body.clave;
	miUsuario.save(function(err){
		if (err) {
			res.status(500).json({mensaje:'Error al registrar al usuario'});
		}
		else {
			res.status(200).json({mensaje:'Usuario registrado'});
		}
	});
});

app.use('/api',router);
app.listen(3005);