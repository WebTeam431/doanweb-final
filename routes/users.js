var user = require('../models/user')
var cart = require('../models/cart.js')



exports.register = function(req, res, next){
	res.render('register')
}

exports.registercheck = function(req, res, next){
	console.log(req.body)
	var name = req.body.name;
	var email = req.body.email;
	var pass = req.body.pwd

	var create = user.create(name, email, pass, null, null, null)

	res.render('login')
}

exports.login = function (req, res, next) {
	res.render('login')
}

exports.logincheck = function(req, res, next){
	var name = req.body.username
	var pass = req.body.password 
	if(name == '' || pass == ''){
		res.redirect('/login')
	}
	else
	{
		var check = user.check(name, pass)
		var username = check.username
		console.log(check)
		switch (check.isadmin) {
			case 1:
				res.render('redirect', {username: username, isadmin: 1, id: check.id})	
				break;
			case 0:
				res.render('redirect', { username: username, isadmin: 0, id: check.id})
				break;
			default:
				res.redirect('/login')
				break;
		}
	}
}

exports.profileEdit = function(req, res, next){
	if (req.query.userid) {
		var userid = req.query.userid
		var result = user.userprofile(userid)
		res.render('userprofile', {data: result})
	}else {
		res.redirect('/')
	}
}

exports.profileEdited = function(req, res, next){
	if (req.query.userid) {
		console.log(req.body)
		var userid = req.query.userid
		var hoten = req.body.hoten
		var diachi = req.body.diachi
		var sdt = req.body.sdt
		var ngaysinh = req.body.ngaysinh
		var gioitinh
		switch (req.body.optradio) {
			case 'Male':
				gioitinh = 0
				break;
			case 'Female':
				gioitinh = 1
				break;
		}
		user.profileEdited(userid, hoten, diachi, sdt, ngaysinh, gioitinh)
		res.redirect('/')
	}else {
		res.redirect('/')
	}
}

exports.viewCart = function(req, res, next){
	var userid = req.query.userid
	console.log(userid)
	var usercart = cart.getCart(userid)
	console.log("USERCART");
	console.log(usercart);
	res.render('cartview', {data: usercart})
}

exports.addtoCart = function(req, res, next){
	var userid = req.body.userid
	var productid = req.query.productid
	var soluong = req.body.soluong
	console.log("CHECK:")
	console.log(userid);
	console.log(productid)
	console.log(soluong);
	if(userid == -1){
		console.log("MUST LOGIN")
		res.redirect('/login')
	}else {
		console.log("OK")
	cart.addtoCart(userid, productid, soluong)
	var redirectlink = "/productview?key=" + productid
	res.redirect(redirectlink)		
	}
}