var express= require('express');                // its an framework using on node
var app= express();                             // initializing express to app
var morgan= require('morgan');                  // for console logging we use morgan
var bodyParser= require('body-parser');         // used to pull posted info
var methodOverride= require('method-override'); // used for PUT and DELETE
var mongoose = require('mongoose');             // to link database
var database= require('./config/database');     // implementing file location for database

var Todo = require("./app/models/todo");
/*mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds149353.mlab.com:49353/pavandb', function(req, res){
  if (err) return console.log(err)
  	db= database
});*/

mongoose.connect(database.url,{'useMongoClient': true});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

/*var Todo= mongoose.model('Todo', {
    text : String
});*/



require('./app/models/route.js')(app);

app.listen(2000, function(){
	console.log('port listen to 2000');
});