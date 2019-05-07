import React, { Component } from 'react';
import API from "../../APIInterface/APIInterface.js";
import UpcomingSessions from "./Sessions/UpcomingSessions";
import CancelledSessions from "./Sessions/CancelledSessions";
import PastSessions from "./Sessions/PastSessions";
import AdviseeHeader from "./AdviseeHeader";
import AdviseeView from "./AdviseeView";


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
			current_main_view: "upcoming_sessions",
			userName: null,
			headerOne: "Sessions",
			headerTwo: "",
			headerTwoItems: [],
			items: [], //will contain advisees if user is an advisor, or advisors if user is advisee
			upcoming: []
		};

		this.changeMainView = this.changeMainView.bind(this);
	}

	changeMainView(newView){
		this.setState({current_main_view: newView})
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

	whatMainView()
	{
		let current_main_view = this.state.current_main_view;

		if(current_main_view === "upcoming_sessions")
			return <UpcomingSessions user={this.state.user}/>;
			//return <h3>Upcoming Sessions</h3>;
		else if(current_main_view === "past_sessions")
			//return <h3>Past Sessions</h3>;
			return <PastSessions user={this.state.user}/>;
		else if(current_main_view === "cancelled_sessions")
			return <h3>Cancelled Sessions</h3>;
			//return <CancelledSessions user={this.state.user}/>
		else
			//return <AdvisorSessions user={this.state.user} advisor={current_main_view}/>;
			return <h3>Hi</h3>;
	}


	componentDidMount (){
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
						this.setState({items:arr, headerTwoItems: advisorNames})
					}
				}).catch((error) =>
				{
				});
				//get list of all booked Sessions

				//get list of all available sessions
			}

		}
	}

	render()
	{

		return (
			<div>
				<AdviseeHeader setUser={this.props.setUser} user={this.state.user} menuName="AdviseeHeader" headerTwo="Advisors" itemNames={this.state.headerTwoItems} changeMainView={this.changeMainView}/>
				{this.whatMainView()}
			</div>
		);
	}
}


export default AdviseeLandingPage;
