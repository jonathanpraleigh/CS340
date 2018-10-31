var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));

app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/games', require('./games.js'));
app.use('/genres', require('./games.js'));
app.use('/developers', require('./games.js'));
app.use('/publishers', require('./games.js'));

//routers
app.get('/', function(req, res){
  res.render('home');
});

app.get('/games', function(req, res){
  res.render('games');
});

app.get('/genres', function(req, res){
  res.render('genres');
});

app.get('/developers', function(req, res){
  res.render('developers');
});

app.get('/publishers', function(req, res){
  res.render('publishers');
});

// custom 404 page
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
