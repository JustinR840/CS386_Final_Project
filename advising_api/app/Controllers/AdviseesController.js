const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class AdviseesController {
	constructor() {}

	async allAdvisees(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                    CALL GetAllAdvisees()
                        `;
			// console.log('About to run this query.', query);
			dbConnection.query({
				sql: query
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdviseesController::allAdvisees", error);
					ctx.body = '<b>Internal Server Error</b>';
					ctx.status = 500;
					return reject(error);
				}
				ctx.body = tuples[0];
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}


	async adviseeInformation(ctx) {
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			let query = `
                    CALL GetAdviseeInformation(?)
                        `;
			// console.log('About to run this query.', query);
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisee_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdviseesController::adviseeInformation", error);
					ctx.body = '<b>Internal Server Error</b>';
					ctx.status = 500;
					return reject(error);
				}
				ctx.body = tuples[0];
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}


	async advisorsForAdvisee(ctx) {
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			let query = `
                    CALL GetAdvisorsForAdvisee(?)
                        `;
			// console.log('About to run this query.', query);
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisee_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdviseesController::advisorsForAdvisee", error);
					ctx.body = '<b>Internal Server Error</b>';
					ctx.status = 500;
					return reject(error);
				}
				ctx.body = tuples[0];
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}
}

module.exports = AdviseesController;
