import React, { Component } from 'react';
import Header from './Header.js'

import AdvisorView from '../Advisor/AdvisorView.js';
import AdvisorHeader from "../Common/Advisor/AdvisorHeader";
import My_Advisees from "../Test_Adivsee/My_Advisees";


class LandingPage extends Component
{
	constructor(props)
	{
		super(props);

		let user = null;

		if(this.props.user !== null && this.props.user !== undefined)
		{
			user = this.props.user;
		}

		// if(this.props.location.state !== null)
		// {
		// 	user = this.props.location.state.user;
		// }

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

		if(current_main_view === "none")
			return "";
		else if(current_main_view === "my_advisees")
			return <My_Advisees user={this.state.user}/>;
		else if(current_main_view === "all_advisees")
			return <h3>ALL ADVISEES</h3>;
		else
			return <h3>ERRRRRR</h3>;
	}


	getHTMLToReturn(role)
	{
		let userName = this.getUsername();

		let mainViewToRender = this.whatMainView();

		if(role === "advisor")
		{
			return (
				<div>
					<AdvisorHeader menuName="AdvisorHeader" user={this.state.user} changeMainView={this.changeMainView}/>
					{mainViewToRender}
					{/*<Switch>*/}
						{/*<Route path="/landing" render={() => <AdvisorView advisor={this.state.user}/>}/>*/}
						{/*<Route exact path="/my_advisees" render={() => <My_Advisees user={this.state.user}/>}/>*/}
					{/*</Switch>*/}
				</div>
			);
		}
		else if(role === "advisee")
		{
			// TODO: CHANGE ME FOR ADVISEE
			return (
				<div>
					<Header menuName="Test Pls" itemNames={['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc']} userName={userName} userType={this.state.user['role']}/>
					<AdvisorView advisor={this.state.user}/>
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


export default LandingPage;
