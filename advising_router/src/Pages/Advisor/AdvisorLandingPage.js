import React, { Component } from 'react';

import AdvisorHeader from "../Advisor/AdvisorHeader";
import MyAdvisees from "./Advisees/MyAdvisees.js";
import AllAdvisees from "./Advisees/AllAdvisees";


class AdvisorLandingPage extends Component
{
	constructor(props)
	{
		super(props);

		let user = null;

		if(this.props.user !== null && this.props.user !== undefined)
		{
			user = this.props.user;
		}

		this.state = {
			user: user,
			current_main_view: "none"
		};

		this.changeMainView = this.changeMainView.bind(this);
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


	changeMainView(newView)
	{
		this.setState({current_main_view: newView})
	}


	whatMainView()
	{
		let current_main_view = this.state.current_main_view;

		if(current_main_view === "my_advisees")
			return <MyAdvisees user={this.state.user}/>;
		else if(current_main_view === "all_advisees")
			return <AllAdvisees/>;
		else
			return <h3>NO MAIN VIEW LOADED</h3>;
	}


	getHTMLToReturn(role)
	{
		if(role === "advisor")
		{
			return (
				<div>
					<AdvisorHeader menuName="AdvisorHeader" user={this.state.user} changeMainView={this.changeMainView}/>
					{this.whatMainView()}
				</div>
			);
		}
		else if(role === "advisee")
		{
			// TODO: CHANGE ME FOR ADVISEE
			return (
				<div>
					<h2>I AM ADVISEE HEADER</h2>
					{/*<Header menuName="Test Pls" itemNames={['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc']} userName={this.getUsername()} userType={this.state.user['role']}/>*/}
					<h3>I AM AN ADVISEE VIEW</h3>
				</div>
			);
		}
	}

	render()
	{
		return (
			<div>
				{this.getHTMLToReturn(this.state.user['role'])}
			</div>
		);
	}
}


export default AdvisorLandingPage;