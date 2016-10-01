// To run: 

// Node lob.js 'USE LOB API KEY HERE'



const Lob = require('lob')(process.argv[2], {// Replace test_de4399ac16561129ab00c7e19ed09ed21e9 with your own LOB API Key 
  apiVersion: '2016-06-30'
}); 
const google = require('googleapis');
const civicSearch = google.civicinfo('v2');
var prompt = require('prompt');

console.log(process.argv[2]);
prompt.start();
prompt.get(['name','address1','address2','city','state','zipcode','message'],function (err,results){
	if(err) throw err;
	var senderInfo = {
		name : results.name, 
		address1 :  results.address1, 
		address2 :  results.address2, 
		city :  results.city, 
		state :  results.state,
		zipcode :  results.zipcode, 
		message :  results.message, 
	};
	var senderAddress =  results.address1 + " " + results.city + " "+ results.state + " "+ results.zipcode;
	var apikey = 'AIzaSyCoYFqJ5b-LB8ra1AZf2kab2y0AdZs2UFc';

	civicSearch.representatives.representativeInfoByAddress({ key: apikey, address: senderAddress}, function(err, response) {
		if(err){
			console.log(err);
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
					  console.log('Letter submitted successfully.');		
					});
		}
	});
});
	
	
	



