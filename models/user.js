var users = [];
//var mysql = require('mysql')
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
		console.log('KET NOI DATABASE USER THANH CONG');
})*/

function refresh(){
	sqlConn.query('SELECT * FROM `nguoidung`', function(error, results, fields){
		users = results
		//console.log(users)
	})
}
function checkUSer(email, pass){
	for (var i = 0; i < users.length; i++) {
		if(users[i].EMAIL == email && users[i].PASSWORD == pass){
			if(users[i].ISADMIN == 1){
				return {isadmin: 1, id: users[i].USERID};
			}
			return {isadmin: 0, id: users[i].USERID, username: users[i].USERNAME};
		}
	}
	return {isadmin: -1, id: -1};
}

refresh()

exports.create = function(name, email, pass){
	var query = "INSERT INTO `nguoidung` (`USERID`, `USERNAME`, `EMAIL`, `PASSWORD`, `GIOITINH`, `NGAYSINH`, `ISADMIN`, `DIACHI`) VALUES (NULL, '"+ name +"', '"+ email +"', '"+ pass +"', NULL, NULL, '0', NULL);"
	sqlConn.query(query, function(error, results, fields){
		if(error){ console.log(error)}
			else {
				refresh();
				console.log("THEM NGUOI DUNG THANH CONG")
				var query = "SELECT `USERID` FROM `nguoidung` WHERE `EMAIL` = '"+ email + "'"
				sqlConn.query(query, function(error, results, fields){
					if (error) { throw error}else {
						var query2 = "INSERT INTO `giohang` (`ID`, `IDNGUOIDUNG`, `TRANGTHAI`, `TONGCONG`) VALUES (NULL, '"+ results[0].USERID + "', '0', '0');"
						sqlConn.query(query2, function(error, results, fields){
							if (error) {throw error}
						})
					}
				})
			}
	})
}

exports.check = function(email, pass){
	return checkUSer(email, pass)
}

exports.userprofile = function(userid){
	for(var i = 0; i < users.length; i++){
		if (users[i].USERID == userid) {
			console.log(users[i])
			return users[i]
		}
	}
}

exports.profileEdited = function(userid, hoten, diachi, sdt, ngaysinh, gioitinh){
	var query = "UPDATE nguoidung set USERNAME = '" + hoten + "', DIACHI = '" + diachi + "', NGAYSINH = '" + ngaysinh + "', GIOITINH = " + gioitinh + " where USERID = " + userid
	console.log(query)
	sqlConn.query(query, function(error, results, fields){
		if(error) throw error
			refresh()
	})
}

