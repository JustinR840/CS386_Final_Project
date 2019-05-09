import React, { Component } from 'react';

import AdvisorHeader from "../Advisor/AdvisorHeader";
import MyAdvisees from "./Advisees/MyAdvisees.js";
import AllAdvisees from "./Advisees/AllAdvisees";
import AllSessions from "./Sessions/AllSessions.js";
import EditSessions from "./Sessions/EditSessions";
import MyBlocks from "./Blocks/MyBlocks";
import BlockCreator from "./Blocks/BlockCreator";
import PastSessions from "./Sessions/PastSessions";
import UpcomingSessions from "./Sessions/UpcomingSessions";
import FutureSessions from "./Sessions/FutureSessions";


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
			current_main_view: "upcoming_sessions"
		};

		this.changeMainView = this.changeMainView.bind(this);
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
		else if(current_main_view === "upcoming_sessions")
			return <UpcomingSessions user={this.state.user}/>;
		else if(current_main_view === "past_sessions")
			return <PastSessions user={this.state.user}/>;
		else if(current_main_view === "future_sessions")
			return <FutureSessions user={this.state.user}/>;
		else if(current_main_view === "all_sessions")
			return <AllSessions user={this.state.user}/>;
		else if(current_main_view === "edit_sessions")
			return <EditSessions user={this.state.user}/>;
		else if(current_main_view === "view_blocks")
			return <MyBlocks user={this.state.user}/>;
		else if(current_main_view === "create_blocks")
			return <BlockCreator user={this.state.user}/>;
		else
			return <h3>NO MAIN VIEW LOADED</h3>;
	}

	render()
	{
		return (
			<div>
				<AdvisorHeader menuName = "AdvisorHeader" user={this.state.user} changeMainView={this.changeMainView}/>
				{this.whatMainView()}
			</div>
		);
	}
}


export default AdvisorLandingPage;
