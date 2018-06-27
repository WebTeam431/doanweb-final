var products = require('../models/products.js')

exports.dashboard = function(req, res, next){
	res.render('adminpanel', {title: "Welcome to admin dashboard"})
}

exports.editproducts = function(req, res, next){

	if(req.query.key){
		console.log('EDIT....')
		console.log(products.get(req.query.key))
		res.render('editproduct', {product: products.get(req.query.key), 
									title: "Sửa sản phẩm"})
	}else {
		var startId;
		if(req.query.startId)
		{
			startId = req.query.startId;
		}else {
			startId = 0;
		}
		console.log('Edit products...');
		res.render('adminpanel', {products: products.getAll(),
								title: "Danh sách sản phẩm",
								startId: startId})
	}
}

exports.deleteproduct = function(req, res, next){
	if(req.query.key){


		res.render('addproduct', {product: products.get(req.query.key),
									title: "Xoá sản phẩm"})
	}else {
		res.redirect('/admin')
	}
}
