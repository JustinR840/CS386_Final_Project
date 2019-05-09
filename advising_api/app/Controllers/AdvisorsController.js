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


	async blocksForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let query = "SELECT * FROM advising_block WHERE advisor_id = ?";
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::blocksForAdvisor", error);
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


	async newBlockForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let newBlockInformation = ctx.request.body['post_data'];

			// Insert into the advising_block table
			let query = "INSERT INTO advising_block VALUES (NULL, ?, ?, ?, ?)";
			dbConnection.query({
				sql: query,
				values: [newBlockInformation['start_time'], newBlockInformation['end_time'], newBlockInformation['sessions'].length, ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::blocksForAdvisor", error);
					ctx.body = '<b>Internal Server Error</b>';
					ctx.status = 500;
					return reject(error);
				}

				let block_id = tuples['insertId'];
				let sessions = newBlockInformation['sessions'];

				sessions.forEach((session, idx) => {
					// Insert into the advising_block table
					let query = "INSERT INTO advising_session VALUES (NULL, ?, ?, ?, ?, ?, ?)";
					dbConnection.query({
						sql: query,
						values: [block_id, session, "", "open", "no", ""]
					}, (error, tuples) => {
						if (error) {
							console.log("Connection error in AdvisorsController::blocksForAdvisor", error);
						}
					});
				});

				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}


	async sessionsForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let query = "SELECT * FROM advising_session ad_se LEFT JOIN advising_block ad_bl ON ad_se.block_id = ad_bl.block_id WHERE ad_bl.advisor_id = ?";
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::sessionsForAdvisor", error);
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


	async pastSessionsForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let query = "SELECT * FROM advising_session ad_se LEFT JOIN advising_block ad_bl ON ad_se.block_id = ad_bl.block_id WHERE ad_bl.advisor_id = ? AND ad_se.start_time < NOW()";
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::pastSessionsForAdvisor", error);
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


	async futureSessionsForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let query = "SELECT * FROM advising_session ad_se LEFT JOIN advising_block ad_bl ON ad_se.block_id = ad_bl.block_id WHERE ad_bl.advisor_id = ? AND ad_se.start_time > NOW()";
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::futureSessionsForAdvisor", error);
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


	async upcomingSessionsForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			const match = ctx.params.advisor_id.match(/[^0-9a-zA-Z]+/);  // We expect an alphanumeric id.
			if (match) {
				console.log('about to return because user input contains non-alphanumeric characters..');
				return reject("Invalid user id.");
			}

			let query = `
			SELECT
			ad_se.locked, ad_se.block_id, ad_se.start_time, ad_se.student_id, ad_se.status, ad_se.notes
			FROM
			advising_session ad_se
			LEFT JOIN
			advising_block ad_bl
			ON
			ad_se.block_id = ad_bl.block_id
			WHERE ad_bl.advisor_id = ?
			AND
			ad_se.start_time < NOW() + INTERVAL 7 DAY`;
			dbConnection.query({
				sql: query,
				values: [ctx.params.advisor_id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorsController::upcomingSessionsForAdvisor", error);
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
