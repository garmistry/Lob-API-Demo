import lob
import sys
import requests


lob.api_key = 'test_de4399ac16561129ab00c7e19ed09ed21e9'

def main(argv): 
	if(len(sys.argv) != 8):
		print ''
		print 'Please check input and try again'
		print 'The input should be as follows'
		print '# python officer.py "Name Here" "Address Line 1 Here" "Address Line 2 Here" "City Here" "State Here" "Zip Here" "Message <200 characters here" '
	else:
		lob.Letter.create(
		  description = 'Demo Letter',
		  to_address = {
		      'name': 'Harry Zhang',
		      'address_line1': '123 Test Street',
		      'address_city': 'Mountain View',
		      'address_state': 'CA',
		      'address_zip': '94041',
		      'address_country': 'US'
		  },
		  from_address = {
		      'name': sys.argv[1],
		      'address_line1': sys.argv[2], 
		      'address_line2': sys.argv[3], 
		      'address_city': sys.argv[4], 
		      'address_state': sys.argv[5], 
		      'address_zip': sys.argv[6] 
		  },
		  file = '<html style="padding-top: 3in; margin: .5in;">'+sys.argv[7]+'</html>',
		  data = {
		    'name': sys.argv[0]
		  },
		  color = True
		)

main(sys.argv)