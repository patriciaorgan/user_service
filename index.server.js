require('dotenv').config();
const app = require('express')();
const {
		PORT, 
		DB_CONNECTION_STRING
	} = process.env,
	{
		urlencoded,
		json
	} = require('body-parser'),
	passport = require('passport'),
	session = require('express-session'),
	services = require('./services');



app.listen(PORT, console.log(`Listening on Port: ${PORT}`));

var mongoose = require('mongoose');
var connection = mongoose.connection;
var Schema = mongoose.Schema;

//db config
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONNECTION_STRING);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', ()=> console.log('connected to DB!'));

//middleware
app.use(urlencoded({extended:true}));
app.use(json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', services);

