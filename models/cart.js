var carts = [];
var donhang = [];
//var mysql = require('mysql')
var product = require('./products')
var sqlConn = require('./sqlConn.js')
/*
var sqlConn = mysql.createPool({
	host: 'us-cdbr-iron-east-04.cleardb.net',
	user: 'b5b8d243535fe5',
	password: '4e975f76',
	database: 'heroku_ad4a43390c0f3e5'	
})

sqlConn.getConnection(function(err, connection){
	if(err) render('error')
		console.log('KET NOI DATABASE GIOHANG THANH CONG');
})*/

function refreshCart(){
	sqlConn.query('SELECT * FROM `giohang`', function(error, results, fields){
		carts = results
		//console.log(carts)
	})
}
function refreshDonHang(){
	sqlConn.query('SELECT * FROM `donhang`', function(error, results, fields){
		donhang = results
		//console.log(donhang)
	})
}
refreshCart()
refreshDonHang()

exports.getCart = function getCart(userid){
	var cartid
	var usercart = [];
	var index = 0;
	for(var i = 0; i< carts.length; i++){
		if(carts[i].IDNGUOIDUNG == userid)
			cartid = carts[i].ID
	}
	for(var i =0; i < donhang.length; i++){
		if(donhang[i].IDGIOHANG == cartid){
			usercart.push(donhang[i])
			var sp = product.get(donhang[i].IDSANPHAM)
			usercart[index].TENSP = sp.TENSP
			usercart[index].GIASP = sp.GIASP
			usercart[index].HINHANHSP = sp.HINHANHSP
			index++
		}
	}
	return usercart
	return -1
}


exports.createCart = function createCart(userid){
	var query = "INSERT INTO `giohang` (`ID`, `IDNGUOIDUNG`, `TRANGTHAI`, `TONGCONG`) VALUES (NULL, '"+ results[0].USERID + "', '0', '0');"
	sqlConn.query(query, function(error, results, fields){
		if (error) {throw error}
			refreshCart();
	})
}

exports.addtoCart = function addtoCart(userid, productid, soluong){
	var s = product.get(productid).GIASP
	var giasp = StringToPrice(s)
	var sotien = giasp * soluong
	var idgiohang
	var tongcong
	for(var i = 0; i < carts.length; i++){
		if(carts[i].IDNGUOIDUNG == userid)
		{
			tongcong = carts[i].TONGCONG + sotien
			idgiohang = carts[i].ID
			break;
		}
	}
	//Them don hang
	var query = "insert into `donhang` (`IDGIOHANG`, `IDSANPHAM`, `SOLUONG`, `SOTIEN`) values (" + idgiohang +", "+ productid + ", "+ soluong +", "+ sotien +")"
	console.log(query)
	sqlConn.query(query, function(error, results, fields){
		if(error){throw error}else {
			refreshDonHang()
		}
	})
	//Cap nhap gio hang
	var query = "UPDATE `giohang` SET `TONGCONG` = "+ tongcong +" WHERE `giohang`.`ID` = 22"
	console.log(query)
	sqlConn.query(query, function(error, results, fields){
		if(error) throw error
			refreshCart()
	})
}

function StringToPrice(string){
	var temp = string
	var s = temp.slice(0, temp.length - 2)
	while(s.indexOf(".") != -1){
		var i = s.indexOf(".")
		var left = s.slice(0, i)
		var right = s.slice(i + 1)
		var s = left + right
	}
	var res = parseInt(s)
	return res 
}
