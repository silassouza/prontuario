var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/index', function(req, res){
	res.render('index');
});

router.post('/success', function(req, res){
	res.end()
});

router.post('/error1', function(req, res){
	res.status(500).send('you have an error'); 
});

router.post('/error2', function(req, res){
	res.status(500).send([
		'you have an error 1',
		'you have an error 2'
	]); 
});

module.exports = router;