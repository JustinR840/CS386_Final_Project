let mysql = require('mysql');

let db_config = {
	debug: true,

	host: 'mySqlHost',
	port: 3306,
	user: 'username',
	password:'password',
	database: 'database'
}

let connection;

function handleDisconnect() {
	connection = mysql.createConnection(db_config);

	connection.connect(function(err) {
		if(err) {
			console.log("error when connection to db: ", err);
			setTimeout(handleDisconnect, 2000);
		}
	});

	connection.on("error", function(err) {
		console.log("db error: ", err);
		if(err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		}
		else {
			throw err;
		}
	});
}

handleDisconnect();

module.exports = connection;
