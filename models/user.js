var users = [];
//var mysql = require('mysql')
var sqlConn = require('./sqlConn.js')


function refresh(){
	sqlConn.query('SELECT * FROM `nguoidung`', function(error, results, fields){
		users = results
		//console.log(users)
	})
}

refresh()

exports.getAll = function(){
	return users
}

exports.get = function(userid){
	console.log("USERID")
	console.log(userid)
	for(var i =0; i< users.length; i++){
		if (users[i].USERID == userid) {
			return users[i]
		}
	}
}

function checkUSer(email, pass){
	console.log(email)
	console.log(pass)
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



exports.create = function(name, email, pass, gioitinh, ngaysinh, diachi){
	var query = "INSERT INTO `nguoidung` (`USERID`, `USERNAME`, `EMAIL`, `PASSWORD`, `GIOITINH`, `NGAYSINH`, `ISADMIN`, `DIACHI`) VALUES (NULL, '"+ name +"', '"+ email +"', '"+ pass +"', "+ gioitinh +", "+ ngaysinh+", '0', '"+diachi+"');"
	console.log(query)	
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
	refresh()
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


exports.edituser = function(email, pass, userid, hoten, diachi, sdt, ngaysinh, gioitinh){
	var query = "UPDATE nguoidung set EMAIL = '"+ email +"', PASSWORD = '"+ pass +"', USERNAME = '" + hoten + "', DIACHI = '" + diachi + "', NGAYSINH = '" + ngaysinh + "', GIOITINH = " + gioitinh + " where USERID = " + userid
	console.log(query)
	sqlConn.query(query, function(error, results, fields){
		if(error) throw error
			refresh()
	})
}

exports.deleteuser = function(userid){
	var q1 = "delete from donhang where IDGIOHANG = (select ID from giohang where IDNGUOIDUNG = "+ userid+")"
	var q2 = "delete from giohang where IDNGUOIDUNG = " + userid
	var q3 = "delete from nguoidung where USERID = " + userid
	console.log(q1)
	console.log(q2)
	console.log(q3)
	sqlConn.query(q1, function(error, results, fields){
		if(error) throw error
		sqlConn.query(q2, function(error, results, fields){
			if(error) throw error
				sqlConn.query(q3, function(error, results, fields){
					if(error) throw error
						refresh()
				})
		})
	})
	refresh()
}