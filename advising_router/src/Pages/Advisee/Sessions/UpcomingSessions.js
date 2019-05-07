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
		/*api.getAdviseeUpcomingSessions(this.props.user['user_id']).then((info) => {
			let sessions = info['data'];

			this.setState({sessions: sessions});
		}).catch((error) => {

		});*/
    api.getAdviseeUpcomingSessions(this.props.user['user_id']).then((info) => {
      let sessions = info['data'];

      this.setState({sessions: sessions});
    }).catch((error) => {

    });
	}


	render()
	{
	//	let headerNames = ['advisor_id', 'block_id', 'end_time', 'locked', 'num_sessions', 'session_id', 'start_time', 'status', 'student_id', 'notes'];
		//let rowIndexes = ['advisor_id', 'block_id', 'end_time', 'locked', 'num_sessions', 'session_id', 'start_time', 'status', 'student_id', 'notes'];
		let temp = []
		this.state.sessions.forEach(element => {
			let name = element['advisor_fName'] + ' ' + element['advisor_lName'];
			let start = new Date(Date.parse(element['start_time'])).toLocaleString();
			temp.push({start: start, advisor: name, notes: element['notes']});
		});

		let headerNames = ['Session Start', 'Advisor', 'Notes'];
		let rowIndexes = ['start', 'advisor', 'notes'];

		return (
			<div>
        <h2 style={{paddingLeft: 8}}>Upcoming Sessions</h2>
				{temp.length > 0 ? (
        <Table titles={headerNames} attributes={rowIndexes} tuples={temp}/>
      ) : (
        <p style={{paddingLeft: 8}}>No Upcoming Sessions</p>
      )}
			</div>
		);
	}
}

export default UpcomingSessions;
