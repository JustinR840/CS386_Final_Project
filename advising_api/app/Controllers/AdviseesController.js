const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

class AdviseesController {
	constructor() {}

	async allAdvisees(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                    select * from advising_student;
                        `;
			dbConnection.query({
				sql: query
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdviseesController::allAdvisees", error);
					ctx.body = '<b>Internal Server Error</b>';
					ctx.status = 500;
					return reject(error);
				}
				ctx.body = tuples;
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
			values : [ctx.params.advisee_id];
			let query = `
			SELECT * FROM advising_student WHERE student_id = ?;
                        `;
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
			values: [ctx.params.advisee_id]
			let query = `SELECT * FROM advising_student_advisor asa LEFT JOIN advising_advisor aa ON asa.advisor_id = aa.advisor_id WHERE asa.student_id = ?;`;
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
				console.log("tups: ", tuples)
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}

	async adviseeUpcomingSessions(ctx){
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			values: [ctx.params.advisee_id]
			let query = `SELECT asa.start_time, asa.notes, asa.student_id, ada.advisor_fName, ada.advisor_lName
			FROM advising_session asa
			LEFT JOIN advising_block adb on asa.block_id = adb.block_id
			LEFT JOIN advising_advisor ada on adb.advisor_id = ada.advisor_id
			WHERE asa.student_id = ? and asa.start_time >= now() and asa.session_id not in(select session_id from cancelled_advising_session);`;
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
				console.log("session tups: ", tuples)
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}

	async adviseePastSessions(ctx){
		console.log('hi');
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			values: [ctx.params.advisee_id]
			let query =
			`SELECT asa.start_time, asa.notes, asa.student_id, ada.advisor_fName, ada.advisor_lName
			FROM advising_session asa
			LEFT JOIN advising_block adb on asa.block_id = adb.block_id
			LEFT JOIN advising_advisor ada on adb.advisor_id = ada.advisor_id
			WHERE asa.student_id = ? and asa.start_time < now();`;
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
				console.log("session tups: ", tuples)
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}

	async adviseeAdvisorOpenSessions(ctx){
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			values: [ctx.params.advisee_id]
			let query = `SELECT asa.start_time, ada.advisor_fName, ada.advisor_lName FROM advising_session asa
			LEFT JOIN advising_block adb on asa.block_id = adb.block_id
			LEFT JOIN advising_advisor ada on adb.advisor_id = ada.advisor_id WHERE adb.advisor_id = ? and asa.student_id = "";`;
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
				console.log("session tups: ", tuples)
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}

	async adviseeCancelledSessions(ctx){
		return new Promise((resolve, reject) => {
			let match = ctx.params.advisee_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}
			values: [ctx.params.advisee_id]

			let query = `SELECT asa.start_time, asa.notes, asa.student_id, ada.advisor_fName, ada.advisor_lName, cas.cancelled_by FROM advising_session asa
			INNER JOIN cancelled_advising_session cas on asa.session_id=cas.session_id
			LEFT JOIN advising_block adb on asa.block_id = adb.block_id
			LEFT JOIN advising_advisor ada on adb.advisor_id = ada.advisor_id where student_id = ?;`;

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
				console.log("session tups: ", tuples)
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}
}



module.exports = AdviseesController;
