var express = require('express');
var router = express.Router();
var request = require("request")
/* GET users listing. */
router.post('/', function(req, res, next) {
	var data = {
		"Url" : "http://rockettraffic.org/checkparameter/?offer_id=22356&aff_id=1398744466902422",
		"Os" : "IOS",
		"Country": "vn",
		"Ipaddress": "113.160.224.237",
		"Pass":"aksjdhqwlwrhoqihewna",
		"User":"vanvietquocanh",
		"Domain": "http://rockettraffic.org"
	}
	request.post( "http://113.160.224.195/api/Offer"
	, {form : data }, (err, body, data)=>{
		res.send(data)
	})
});

module.exports = router;
