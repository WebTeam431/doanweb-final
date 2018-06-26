var mysql = require('mysql');


var connection = mysql.createPool({
	host: 'us-cdbr-iron-east-04.cleardb.net',
	user: 'b5b8d243535fe5',
	password: '4e975f76',
	database: 'heroku_ad4a43390c0f3e5'	
})

connection.getConnection(function(err, connection){
	if(err) render('error')
		console.log('KET NOI DATABASE THANH CONG');
})

module.exports = connection;