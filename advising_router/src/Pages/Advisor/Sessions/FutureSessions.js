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

		api.getFutureSessionsForAdvisor(this.props.user['user_id']).then((info) => {
			let sessions = info['data'];
			this.setState({sessions: sessions});
		}).catch((error) => {

		});
	}


	render()
	{
		let headerNames = ['locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];
		let rowIndexes = ['locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];

		return (
			<div>
				<Typography variant="h3" align="center" style={{marginTop: '20px'}}>Future Advising Appointments</Typography>
				<PaginationTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.sessions}/>
			</div>
		);
	}
}

export default AllSessions;
