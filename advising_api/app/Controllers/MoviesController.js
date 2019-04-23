const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class MoviesController {
	constructor() {}

	async allMovies(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                    SELECT
								*
                   	FROM 
                            	movies
					LIMIT 100
                        `;
			console.log('About to run this query.', query);
			dbConnection.query({
				sql: query
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in MoviesController::allMovies", error);
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

	// async allCoursesForTerm(ctx) {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `
    //                 SELECT
	// 							*
    //                	FROM
    //                         	course_base cb LEFT JOIN
	// 							course_catalog cca ON (cb.catalog = cca.catalog) LEFT JOIN
	// 							course_components cco ON (cb.term = cco.term AND cb.class_number = cco.parent_class_number) LEFT JOIN
	// 							course_instructors ci ON (cb.term = ci.term AND cco.class_number = ci.class_number)
    //                 WHERE
    //                         	cb.term = ?
	//                 ORDER BY
	// 							cb.term, cb.subject, cb.catalog, cb.units
    //                     `;
	// 		console.log('About to run this query.', query);
	// 		dbConnection.query({
	// 			sql: query,
	// 			values: [ctx.params.term]
	// 		}, (error, tuples) => {
	// 			if (error) {
	// 				console.log("Connection error in CourseController::allCoursesForTerm", error);
	// 				ctx.body = '<b>Internal Server Error</b>';
	// 				ctx.status = 500;
	// 				return reject(error);
	// 			}
	// 			ctx.body = tuples;
	// 			ctx.status = 200;
	// 			return resolve();
	// 		});
	// 	}).catch(err => console.log("Database connection error.", err));
	// }
	//
	// async allDepartmentCoursesForTerm(ctx) {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `
    //                 SELECT
	// 							*
    //                	FROM
    //                         	course_base cb LEFT JOIN
	// 							course_catalog cca ON (cb.catalog = cca.catalog) LEFT JOIN
	// 							course_components cco ON (cb.term = cco.term AND cb.class_number = cco.parent_class_number) LEFT JOIN
	// 							course_instructors ci ON (cb.term = ci.term AND cco.class_number = ci.class_number)
    //                 WHERE
    //                         	cb.term = ? AND
	// 							cb.subject = ?
	//                 ORDER BY
	// 							cb.term, cb.subject, cb.catalog, cb.units
    //                     `;
	// 		console.log('About to run this query.', query);
	// 		dbConnection.query({
	// 			sql: query,
	// 			values: [ctx.params.term, ctx.params.department]
	// 		}, (error, tuples) => {
	// 			if (error) {
	// 				console.log("Connection error in CourseController::allDepartmentCoursesForTerm", error);
	// 				ctx.body = '<b>Internal Server Error</b>';
	// 				ctx.status = 500;
	// 				return reject(error);
	// 			}
	// 			ctx.body = tuples;
	// 			ctx.status = 200;
	// 			return resolve();
	// 		});
	// 	}).catch(err => console.log("Database connection error.", err));
	// }
	//
	// async allCatalogCoursesForDepartmentForTerm(ctx) {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `
    //                 SELECT
	// 							*
    //                	FROM
    //                         	course_base cb LEFT JOIN
	// 							course_catalog cca ON (cb.catalog = cca.catalog) LEFT JOIN
	// 							course_components cco ON (cb.term = cco.term AND cb.class_number = cco.parent_class_number) LEFT JOIN
	// 							course_instructors ci ON (cb.term = ci.term AND cco.class_number = ci.class_number)
    //                 WHERE
    //                         	cb.term = ? AND
	// 							cb.subject = ? AND
	// 							cb.catalog = ?
	//                 ORDER BY
	// 							cb.term, cb.subject, cb.catalog, cb.units
    //                     `;
	// 		console.log('About to run this query.', query);
	// 		dbConnection.query({
	// 			sql: query,
	// 			values: [ctx.params.term, ctx.params.department, ctx.params.catalog]
	// 		}, (error, tuples) => {
	// 			if (error) {
	// 				console.log("Connection error in CourseController::allCatalogCoursesForDepartmentForTerm", error);
	// 				ctx.body = '<b>Internal Server Error</b>';
	// 				ctx.status = 500;
	// 				return reject(error);
	// 			}
	// 			ctx.body = tuples;
	// 			ctx.status = 200;
	// 			return resolve();
	// 		});
	// 	}).catch(err => console.log("Database connection error.", err));
	// }
	//
	// async allGECoursesForTerm(ctx) {
	// 	return new Promise((resolve, reject) => {
	// 		let query = `
    //                 SELECT
	// 							*
    //                	FROM
    //                         	course_base cb LEFT JOIN
	// 							course_catalog cca ON (cb.catalog = cca.catalog) LEFT JOIN
	// 							course_components cco ON (cb.term = cco.term AND cb.class_number = cco.parent_class_number) LEFT JOIN
	// 							course_instructors ci ON (cb.term = ci.term AND cco.class_number = ci.class_number)
    //                 WHERE
	//                     		cb.ge_designation IS NOT NULL AND
    //                         	cb.term = ?
	//                 ORDER BY
	// 							cb.term, cb.subject, cb.catalog, cb.units
    //                     `;
	// 		console.log('About to run this query.', query);
	// 		dbConnection.query({
	// 			sql: query,
	// 			values: [ctx.params.term]
	// 		}, (error, tuples) => {
	// 			if (error) {
	// 				console.log("Connection error in CourseController::allGECoursesForTerm", error);
	// 				ctx.body = '<b>Internal Server Error</b>';
	// 				ctx.status = 500;
	// 				return reject(error);
	// 			}
	// 			ctx.body = tuples;
	// 			ctx.status = 200;
	// 			return resolve();
	// 		});
	// 	}).catch(err => console.log("Database connection error.", err));
	// }

}

module.exports = MoviesController;
