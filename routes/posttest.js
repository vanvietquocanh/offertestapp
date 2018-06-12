var express = require('express');
var router = express.Router();
var request = require("request")
/* GET users listing. */
router.post('/', function(req, res, next) {
	console.log(req.body)
});

module.exports = router;
