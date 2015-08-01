/**
 * Created by suzanne on 7/29/15.
 */
  //From Scotch.io
  //https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

//server.js

//BASE SETUP
//==============

//set up
var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var morgan = require('morgan');  //log eery request to console
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');


//configure

//mongoose.connect('mongodb://localhost/bookBox');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

//routes
var router = express.Router();
require('./app/routes/routes')(app, router);

//set port
var port = process.env.PORT || 8080;

//START THE SERVER
// =================
app.listen(port);
console.log('Magic happens on port ' + port);