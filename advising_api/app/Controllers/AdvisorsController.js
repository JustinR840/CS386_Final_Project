const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class AdvisorsController {
	constructor() {}

	async allAdvisors(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                    CALL GetAllAdvisors()
                        `;
			console.log('About to run this query.', query);
			dbConnection.query({
				sql: query
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::allAdvisors", error);
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


	async advisorInformation(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			let query = `
                    CALL GetAdvisorInformation(?)
                        `;
			console.log('About to run this query.', query);
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::advisorInformation", error);
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


	async adviseesForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			let query = `
                    CALL GetAdviseesForAdvisor(?)
                        `;
			console.log('About to run this query.', query);
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::adviseesForAdvisor", error);
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

module.exports = AdvisorsController;
