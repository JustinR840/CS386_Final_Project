const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {

            const match = ctx.params.user_id.match(/[^0-9]+/);
            // console.log('match = ', match);

            if(match) {
                return reject("Incorrect login credentials.");
            }
            let query = "SELECT * FROM advising_user WHERE user_id = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.user_id]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        console.log("TUPLES[0]: ");
                        console.log(tuples[0]);
                        setAccessToken(ctx, tuples[0]);
                        console.log('from studentRecord. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                    } else {
                        console.log('Not able to identify the user.');
                        return reject('No such user.');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('authorize in LoginController threw an exception. Reason...', err);
            ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

}

module.exports = LoginController;
