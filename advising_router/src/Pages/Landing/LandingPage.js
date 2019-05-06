import React, { Component } from 'react';
import AdviseeHeader from './AdviseeHeader.js'
import AdvisorHeader from './AdvisorHeader.js'
import API from "../../APIInterface/APIInterface.js";
import AdviseeView from '../Advisee/AdviseeView.js'
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
			user: user,
			userName: null,
			headerOne: "Sessions",
			headerTwo: "",
			headerTwoItems: [],
			items: [] //will contain advisees if user is an advisor, or advisors if user is advisee
		};
	}

	getUsername(){
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

	componentDidMount ()
	{
		const api = new API();
		if(this.state.user !== null)
		{
			// Axios call
			if(this.state.user['role']=== "advisee"){
				api.getAdvisorsForAdvisee(this.state.user['user_id']).then((info) =>
				{
					let arr = info['data'].map(a => new Object({advisor_id: a.advisor_id, advisor_fName: a.advisor_fName, advisor_lName: a.advisor_lName}));
					if(arr !== null)
					{
						let advisorNames = []
						arr.forEach(element => {
								advisorNames.push(element['advisor_fName'] + ' ' + element['advisor_lName'])
						});
						let userName = this.getUsername();
						console.log(userName);
						this.setState({userName: userName, items:arr, headerTwoItems: advisorNames})
					}
				}).catch((error) =>
				{
				});

			}
			else if(this.state.user['role'] === "advisor"){
			}
		}
	}




	getHTMLToReturn(role)
	{
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];

		if(role === "advisor")
		{
			return (
				<div>
					<AdvisorHeader menuName="Test Pls" headerTwo="Advisees" itemNames={this.state.headerTwoItems} userName={this.state.userName} userType={this.state.user['role']}/>
					<AdvisorView advisor={this.state.user}/>
				</div>
			);
		}
		else if(role === "advisee")
		{
				let items = this.state.items;
				console.log("items", items[0]);
				console.log()
			return (
				<div>
					<AdviseeHeader menuName="Test Pls" headerTwo="Advisors" itemNames={this.state.headerTwoItems} userName={this.state.userName} userType={this.state.user['role']}/>
					<AdviseeView advisee={this.state.user} advisors={items} test="test"/>
				</div>
			);
		}
	}


	render()
	{
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
