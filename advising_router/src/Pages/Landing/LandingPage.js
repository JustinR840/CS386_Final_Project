import React, { Component } from 'react';
import Header from './Header.js'
import API from "../../APIInterface/APIInterface.js";

import AdvisorView from '../Advisor/AdvisorView.js';
import {Redirect, withRouter} from "react-router-dom";


class LandingPage extends Component
{
	render()
	{
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
/*
		const api = new API();

		let userName = 'Erei';
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
		let user_type = this.props.userType;
		console.log("hi",this.props);

		if(user_type === 'advisee'){
			console.log('hi');
			api.getAdvisor(this.props.user_id).then((info) =>
			{
				let advisor = info['data'];
				console.log(advisor);
			}).catch((error) =>
			{
				// What kind of error should be here?
			});
		}
*/

		if(this.props.location.state === null || this.props.location.state === undefined)
		{
			console.log("Location state is null, redirecting to /login");
			return <Redirect to="/login"/>
		}

		let user = this.props.location.state.user;

		// Check if user is logged in
		if(user === null || user === undefined)
		{
			console.log("User is null, redirecting to /login");
			// If user is not logged in, redirect them to the login page
			return <Redirect to="/login"/>;
		}
		else
		{
			console.log(user);

			// Set username on right side
			let fName = user['fName'];
			let lName = user['lName'];
			let userName = "";

			if(fName !== null)
			{
				userName += fName;

				if(lName !== null)
				{
					userName += " " + lName;
				}
			}
			else
			{
				userName = user['user_id'];
			}


			return (
				<div>
					<Header menuName="Test Pls" itemNames={AdvisorNames} userName={userName} userType={user['role']}/>
					<AdvisorView advisor={user}/>
				</div>
			);

		}
	}
}


export default withRouter(LandingPage);
