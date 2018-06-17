var express = require('express');
var router = express.Router();
var request = require("request")

var regexID = /com\.+[A-Za-z]+\.[A-Za-z]+|id+[0-9]+/
var apple = /itunes|apple/
var market = /google|market|chplay/
var isAppsLive = /google|market|chplay|itunes|apple/
/* GET users listing. */
router.post('/', function(req, res, next) {
	if(req.body){
		var data = {
			"Url" : req.body.url,
			"Os"  : req.body.platform,
			"Country": req.body.country,
			"Ipaddress": "113.160.224.195",
			"Pass":"aksjdhqwlwrhoqihewna",
			"User":"vanvietquocanh",
			"Domain": "http://rockettraffic.org"
		}
		request.post( "http://113.160.224.195/api/Offer"
		, {form : data }, (err, body, data)=>{
			var dataRes = JSON.parse(data)
			var platform;
			if(dataRes.message){
				if(apple.test(dataRes.message)){
					platform = "ios";
				}else{
					platform = "android";
				}
				if(isAppsLive.test(data.message)){
					request.get(`http://rockettraffic.org/infoapp/api?platform=${platform}&id=${dataRes.message.match(regexID)[0]}`, (err, body, responseGet)=>{
						dataRes.icon = responseGet.image;
						res.send(dataRes)
					})
				}else{
					res.send(dataRes)
				}
			}
		})
	}
});
module.exports = router;
