import React, { Component } from 'react';
import API from "../../APIInterface/APIInterface.js";
import AdvisorHeader from "../Advisor/AdvisorHeader";
import MyAdvisees from "../Advisor/Advisees/MyAdvisees.js";
import AllAdvisees from "../Advisor/Advisees/AllAdvisees";
import AdviseeHeader from "./AdviseeHeader";
import AdviseeView from "../Advisee/AdviseeView";


class AdviseeLandingPage extends Component
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
			current_main_view: "none",
			userName: null,
			headerOne: "Sessions",
			headerTwo: "",
			headerTwoItems: [],
			items: [], //will contain advisees if user is an advisor, or advisors if user is advisee
			upcoming: []
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
				//get list of all booked Sessions

				//get list of all available sessions
			}
			else if(this.state.user['role'] === "advisor"){
			}
		}
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
			return (
				<div>
					<AdviseeHeader menuName="Test Pls" headerTwo="Advisors" itemNames={this.state.headerTwoItems} userName={this.state.userName} userType={this.state.user['role']}/>
					<AdviseeView advisee={this.state.user} advisors={this.state.items} test="test"/>
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


export default AdviseeLandingPage;
