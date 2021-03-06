import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import Table from "../Table";


class UpcomingSessions extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
		    sessions: []
		};
	}

	componentDidMount ()
	{
		const api = new API();
		api.getAdviseeAdvisorOpenSessions(this.props.advisor_id).then((info) => {
			let sessions = info['data'];
			console.log(sessions);
			this.setState({sessions: sessions});
		}).catch((error) => {

		});
	}


	render()
	{
		let temp = []
		this.state.sessions.forEach(element => {
			let name = element['advisor_fName'] + ' ' + element['advisor_lName'];
			let start = new Date(Date.parse(element['start_time'])).toLocaleString();
			temp.push({start: start, advisor: name,});
		});

		let headerNames = ['Session Start', 'Advisor'];
		let rowIndexes = ['start', 'advisor'];

		return (
			<div>
        <h2 style={{paddingLeft: 8}}>Available Sessions for {this.props.name}</h2>
				{temp.length > 0 ? (
        <Table titles={headerNames} attributes={rowIndexes} tuples={temp}/>
      ) : (
        <p style={{paddingLeft: 8}}>No Available Sessions</p>
      )}
			</div>
		);
	}
}

export default UpcomingSessions;
