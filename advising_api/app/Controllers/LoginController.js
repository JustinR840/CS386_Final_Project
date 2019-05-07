const crypto = require("crypto");

const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');



require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {

            // Username and password will be in the headers
          //  let user_id = ctx.request.headers['user_id'];
            //let password_hash = ctx.request.headers['password_hash'];
            let user_id = ctx.request.body['user_id'];
            let password_hash = ctx.request.body['password_hash'];

            // Make sure both fields were specified
            if(user_id === undefined || password_hash === undefined)
            {
                console.log("Headers not properly provided");
                return reject("No such user.");
            }

            // Make sure both fields follow proper formatting
            let match = user_id.match(/[^0-9]+/);
            match = match && password_hash.match(/[^0-9a-zA-Z]/);
            if(match) {
                return reject("Incorrect login credentials.");
            }

            // Try and find the user in the DB.
            let query = "SELECT au.user_id, au.password_hash, au.role, aa.advisor_fName AS a_fName, aa.advisor_lName AS a_lName, ads.student_fName AS s_fName, ads.student_lName AS s_lName FROM advising_user au LEFT JOIN advising_advisor aa ON au.user_id = aa.advisor_id LEFT JOIN advising_student ads ON au.user_id = ads.student_id WHERE user_id = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [user_id]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }

                    // If we find a user...
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        // TODO: The below should be removed and the hashes stored in the DB itself, but whatever this works for now.
                        // Verify that the passwords match
                        let try_password_hash = crypto.createHash('md5').update(tuples[0]['password_hash']).digest('hex');
                        if(try_password_hash === password_hash)
                        {
                            let obj = {
                                user_id: tuples[0]['user_id'],
                                role: tuples[0]['role'],
                                fName: "",
                                lName: ""
                            };

                            if(obj['role'] === "advisor")
                            {
                                obj['fName'] = tuples[0]['a_fName'];
                                obj['lName'] = tuples[0]['a_lName'];
                            }
                            else
                            {
                                obj['fName'] = tuples[0]['s_fName'];
                                obj['lName'] = tuples[0]['s_lName'];
                            }


                            // Give the requesting user an access token
                            setAccessToken(ctx, obj);
                            ctx.body = {
                                status: "OK",
                                user: obj,
                            };
                        }
                        else
                        {
                            // Incorrect password
                            console.log('Password did not match.');
                            return reject('Username or password incorrect.');
                        }
                    }
                    else
                    {
                        // User id is not in the database
                        console.log('Not able to identify the user.');
                        return reject('Username or password incorrect.');
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
