var products = require('../models/products.js')
var user = require('../models/user.js')

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

exports.userlist = function(req, res, next){
	var users = user.getAll()
	for(var i=0; i<users.length; i++){
		if (users[i].ISADMIN == 1) {
			users.splice(i, 1);
		}
	}
	console.log(users)
	res.render('userlist', {data: users})
}

exports.edituser = function(req, res, next){
	if(req.query.userid){
		var userid = req.query.userid
		var data = user.get(userid)
		if(data.NGAYSINH){
			data.NGAYSINH = data.NGAYSINH.toString()
		}
		res.render('edituser', {data: data})
	}
}

exports.editeduser = function(req, res, next) {	
	if (req.query.userid) {
		console.log("EDITED:")
		console.log(req.body)
		var email = req.body.email
		var pass = req.body.matkhau
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
		user.edituser(email, pass, userid, hoten, diachi, sdt, ngaysinh, gioitinh)
		res.redirect('/admin')
	}else {
		res.redirect('/admin')
	}
}

exports.deleteuser = function(req, res, next){
	if(req.query.userid){
		res.render('deleteuser', {data: user.get(req.query.userid)})
	}
}

exports.deleteduser = function(req, res, next){
	if(req.query.userid)
	{
		var userid = req.query.userid
		user.deleteuser(userid)
		res.redirect('/admin')
	}
}

exports.createuser = function(req, res, next){
	res.render('createuser')
}

exports.createduser = function(req, res, next){
	console.log(req.body)
	if(req.body.hoten){
		if(req.body.matkhau){
			if(req.body.email){
			var gioitinh
			switch (req.body.optradio) {
				case 'Male':
					gioitinh = 0
					break;
				case 'Female':
					gioitinh = 1
					break;
			}	
				user.create(req.body.hoten, req.body.email, req.body.matkhau, gioitinh, req.body.ngaysinh, req.body.diachi)
				res.redirect('/admin')
			}
		}
	}
	res.redirect('/admin')
}