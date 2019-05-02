import React, { Component } from 'react';
import Header from './Header.js'
import API from "../../APIInterface/APIInterface.js";
import AdviseeView fro '../Advisee'
import AdvisorView from '../Advisor/AdvisorView.js';
import {Redirect, withRouter} from "react-router-dom";


class LandingPage extends Component
{
	constructor(props)
	{
		super(props);

		let user = null;

		if(this.props.location.state !== null)
		{
			user = this.props.location.state.user;
		}

		this.state = {
			user: user
		};
	}


	getUsername()
	{
		// This is all just code to set the username next to the logout button.
		let fName = this.state.user['fName'];
		let lName = this.state.user['lName'];

		let userName = "";

		if(fName !== null)
		{
			userName += fName;
			// Try appending lName to the userName also.
			if(lName !== null)
			{
				userName += " " + lName;
			}
		}
		else
		{
			// Fallback to using the user_id as a display name if fName is null.
			userName = this.state.user['user_id'];
		}

		return userName;
	}


	getHTMLToReturn(role)
	{
		let userName = this.getUsername();
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];

		if(role === "advisor")
		{
			return (
				<div>
					<Header menuName="Test Pls" itemNames={AdvisorNames} userName={userName} userType={this.state.user['role']}/>
					<AdvisorView advisor={this.state.user}/>
				</div>
			);
		}
		else if(role === "advisee")
		{
			// TODO: CHANGE ME FOR ADVISEE
			return (
				<div>
					<Header menuName="Test Pls" itemNames={AdvisorNames} userName={userName} userType={this.state.user['role']}/>
					<AdviseeView advisor={this.state.user}/>
				</div>
			);
		}
	}

	render()
	{
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

		// Check if user is logged in
		if(this.state.user === null)
		{
			console.log("User is null, redirecting to /login");
			// If user is not logged in, redirect them to the login page
			return <Redirect to="/login"/>;
		}

		return (
			<div>
				{
					this.getHTMLToReturn(this.state.user['role'])
				}
			</div>
		);
	}
}


export default withRouter(LandingPage);
