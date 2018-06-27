var express = require('express');
var router = express.Router();

var products = require('../models/products')

/* GET home page. */
router.get('/', function(req, res, next) {
	var startId;
	if(req.query.startId)
	{
		startId = req.query.startId;
	}else {
		startId = 0;
	}
	res.render('index', {title: 'Đồ án Web',
						products: products.getAll(),
						startId: startId})
});

router.get('/screen', function(req, res, next){
		var startId;
	if(req.query.startId)
	{
		startId = req.query.startId;
	}else {
		startId = 0;
	}
	res.render('index', {
		title: 'Màn hình',
		products: products.getByType('SCREEN'),
		startId: startId
	})
})
router.get('/cpu', function(req, res, next){
		var startId;
	if(req.query.startId)
	{
		startId = req.query.startId;
	}else {
		startId = 0;
	}
	res.render('index', {
		title: 'CPU',
		products: products.getByType('CPU'),
		startId: startId
	})
})
router.get('/mouse', function(req, res, next){
		var startId;
	if(req.query.startId)
	{
		startId = req.query.startId;
	}else {
		startId = 0;
	}
	res.render('index', {
		title: 'Chuột máy tính',
		products: products.getByType('MOUSE'),
		startId: startId
	})
})
router.get('/keyboard', function(req, res, next){
		var startId;
	if(req.query.startId)
	{
		startId = req.query.startId;
	}else {
		startId = 0;
	}
	res.render('index', {
		title: 'Bàn phím',
		products: products.getByType('KEYBOARD'),
		startId: startId
	})
})

module.exports = router;
