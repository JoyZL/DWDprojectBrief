var express = require('express');
var bodyParser = require('body-parser');
var expressHbs = require('express3-handlebars');
var handlebars = expressHbs.create();
	//make the main.handlebars as the default layout reference
	defaultLayout: 'main'

var app = express();

//make handlebars the templated engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//require defaultValues js file
//var hi = require('./defaultValues');


//set defualt page to be index.handlelbars
app.get('/', function(req, res){

	res.render('index',{

	userName:'Joy',
	greeting: 'Welcome Back!'

	});
});

//load hi name and greeting in defaultValue.js
// app.get('/', function(req, res){
// 	res.send('Hi' + ' ' + hi.userName + ',' + hi.greeting);
// });

//go to restaurant.html page 
app.get('/restaurants', function(req, res){

	res.render('restaurants', {
		restaurant1: 'Chipotle',
		restaurant2: 'Fresh&Co',
		restaurant3: 'M2M',
		restaurant4: 'Cafetasia'
	});

  //res.send('./public/restaurant.html');
  //res.render('restaurants.handlebars');
});


app.get('/restaurants/:name', function(req, res){
	console.log('getting the restaurant');


	var restaurantData = {
		'key': 'value',
		
		'Chipotle':{
		name: 'Chipotle',
		location: '55 E 8th St (b/t University Pl & Greene St)'
		},
		'Fresh&co':{
		name: 'Fresh&co',
		location: '729 Broadway (b/t Washionton Pl & Astor Pl)'
		},
		'M2M':{
		name: 'M2M',
		location: '19 Waverly Pl (b/t Greene St & Mercer St)'
		},
		'Cafetasia':{
		name: 'Cafetasia',
		location: '38 E 8th St (b/t Greene St & University Pl)'
		},
	}

	var cuisine = [
		{foodtype: 'salad' },
		{foodtype: 'soup'},
		{foodtype: 'sandwitch'},
		{foodtype: 'stir-fry'}
	]

	//data.cuisine = cuisine;

	var name = req.params.name;
	console.log(name);
	var data = restaurantData[name];
	data.cuisine = cuisine;

	if (!data) {
		res.send('I could not find a restaurant named:' +name);
	} else {
		console.log(data);
		res.render('therestaurant', data);
	}

})


//get JSON data using npm request
var request = require('request');
app.get('/weather', function(req, res){
	var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk';
	request(url, function(error, response, body){
		var json = JSON.parse(body);
		res.send(json);
	});
});

//any other url path will display wildcard, always put it at they end
app.get('*', function(req, res){
	res.send ('wildcard');
});

//app.use(express.static('public'));

app.use('/public', express.static('public'));

app.listen(5000);