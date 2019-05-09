import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import PaginationTable from "../PaginationTable";
import {Typography} from "@material-ui/core";


class AllSessions extends Component
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

		api.getAllSessionsForAdvisor(this.props.user['user_id']).then((info) => {
			let sessions = info['data'];
			this.setState({sessions: sessions});
		}).catch((error) => {

		});
	}


	render()
	{
		let headerNames = ['advisor_id', 'block_id', 'end_time', 'locked', 'num_sessions', 'session_id', 'start_time', 'status', 'student_id', 'notes'];
		let rowIndexes = ['advisor_id', 'block_id', 'end_time', 'locked', 'num_sessions', 'session_id', 'start_time', 'status', 'student_id', 'notes'];

		return (
			<div>
				<Typography variant="h3" align="center" style={{marginTop: '20px'}}>All Advising Appointments</Typography>
				<PaginationTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.sessions}/>
			</div>
		);
	}
}

export default AllSessions;
