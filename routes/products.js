var products = require('../models/products')


exports.view = function(req, res, next){
	var product = undefined
	if(req.query.key){
		product = products.get(req.query.key)
	}
	res.render('productview', {
		title: product ? product.TENSP : "",
		productKey: req.query.key,
		product: product
	})
}

exports.addproduct = function(req, res, next){
	res.render('addproduct', {title: "Thêm sản phẩm"})
}

exports.newImgName = function(){
	return newImgName();
}
 
function newImgName(){
	var name = products.getAll().length + 1;
	name = name + ".jpg"
	return name;
}

exports.add = function(req, res, next){
	var tensp = req.body.tensp;
	var giasp = req.body.giasp;
	var loaisp = req.body.loaisp;
	var motasp = req.body.motasp;
	var masp = products.getAll().length + 1;
	var Imgname = newImgName()
	var hinhanhsp = "/images/" + Imgname

	products.add(masp, tensp, loaisp, giasp, motasp, hinhanhsp)

	res.redirect('/admin')
}

exports.edit = function(req, res, next){
	var tensp = req.body.tensp;
	var giasp = req.body.giasp;
	var loaisp = req.body.loaisp;
	var motasp = req.body.motasp;
	var masp = req.body.masp;

	products.edit(masp, tensp, loaisp, giasp, motasp)

	res.redirect('/editproducts')
}

exports.deleteproduct = function(req, res, next){
	var masp = req.body.masp
}

exports.delete = function(req, res, next){
	var masp = req.body.masp;
	products.delete(masp);
	res.redirect('/admin');
}
