var express = require('express')
var bodyParser = require('body-parser')
var app = express(); 
var Lob = require('lob')('test_de4399ac16561129ab00c7e19ed09ed21e9', {// Replace test_de4399ac16561129ab00c7e19ed09ed21e9 with your own LOB API Key 
  apiVersion: '2016-06-30'
}); 

app.use(express.static('../public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var google = require('googleapis');
var civicSearch = google.civicinfo('v2');

var portNumber = 8000;
app.listen(portNumber);


console.log("Server listening at " + portNumber)


app.get('/', function(req, res){
	res.json('Hello World');
});



app.post('/sendletter', function(req,res){

	var senderInfo = {
		name : req.body.name, 
		address1 :  req.body.address1, 
		address2 :  req.body.address2, 
		city :  req.body.city, 
		state :  req.body.state,
		zipcode :  req.body.zipcode, 
		message :  req.body.message, 
	};
	console.log(senderInfo);
	var senderAddress =  req.body.address1 + " " + req.body.city + " "+ req.body.state + " "+ req.body.zipcode;
	var apikey = 'AIzaSyCoYFqJ5b-LB8ra1AZf2kab2y0AdZs2UFc';

	civicSearch.representatives.representativeInfoByAddress({ key: apikey, address: senderAddress}, function(err, response) {
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			var representative = {
					name : response.officials[0].name,
					address1 : response.officials[0].address[0].line1,					
					city : response.officials[0].address[0].city, 
					state : response.officials[0].address[0].state,
					zipcode : response.officials[0].address[0].zip, 
				}


				Lob.letters.create({
					description: 'Political Letter',
					to:{
						name : representative.name,
						address_line1 : representative.address1,
						address_city : representative.city,
						address_state : representative.state,
						address_zip : representative.zipcode,

					},
					from:{
						name : senderInfo.name,
						address_line1 : senderInfo.address1,
						address_line2 : senderInfo.address2,
						address_city : senderInfo.city,
						address_state: senderInfo.state,
						address_zip : senderInfo.zipcode,
					},
					file: '<html style="padding-top: 3in; margin: .5in;">'+ senderInfo.message + '</html>',
					data: {
					    name: senderInfo.name
					  },
					color: true
					}, function (err, res){
					  		
					});
			res.status(200).json({isValue: 'true'});;
		}
	});



		

});