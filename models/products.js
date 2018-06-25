//var mysql = require('mysql')
var sqlConn = require('./sqlConn.js')

var products = []
/*
var sqlConn = mysql.createPool({
	host: 'us-cdbr-iron-east-04.cleardb.net',
	user: 'b5b8d243535fe5',
	password: '4e975f76',
	database: 'heroku_ad4a43390c0f3e5'	
})

sqlConn.getConnection(function(err, connection){
	if(err) render('error')
		console.log('KET NOI DATABASE PRODUCT THANH CONG');
})*/

function refresh(){
	sqlConn.query('SELECT * FROM `sanpham` ORDER BY `MASP` ASC ', function(error, results, fields)
	{
		if(error) throw error;
		products = results
	})	
}

refresh()

exports.getAll = function(){
	refresh()
	return products;
}

exports.get = function(masp){
	for (var i = 0; i < products.length; i++) {
		if(products[i].MASP == masp ){
			return(products[i])
		}
	}
	return -1
}

exports.getByType = function(loaisp){
	var results = []
	for (var i = 0; i < products.length; i++) {
		if(products[i].LOAISP == loaisp){
			results.push(products[i])
		}
	}
	return(results)
}

exports.add = function(masp, tensp, loaisp, giasp, motasp, hinhanhsp){
	refresh();
	var query = "INSERT INTO `sanpham` (`MASP`, `LOAISP`, `TENSP`, `GIASP`, `MOTASP`, `HINHANHSP`) VALUES ('" + masp + "', '" + loaisp + "', '" + tensp + "', '" + giasp + "', '" + motasp + "', '" + hinhanhsp + "');"
	console.log(query);
	sqlConn.query(query, function(error, results, fields)
	{
		if(error) throw error;	
	})

	refresh();
}

exports.edit = function(masp, tensp, loaisp, giasp, motasp){
	var query = "update sanpham set loaisp = '" + loaisp + "', tensp = '" + tensp + "', giasp = '" + giasp + "', motasp = '" + motasp + "' where masp = " + masp;
	console.log(query);

	sqlConn.query(query, function(error, results, fields)
	{
		if(error) throw error;	
	})

	refresh();
}

exports.delete = function(masp){
	var query = "DELETE FROM `sanpham` WHERE `sanpham`.`MASP` = " + masp;
	console.log(query);

	sqlConn.query(query, function(error, results, fields)
	{
		if(error) throw error;	
	})
	refresh();

}
