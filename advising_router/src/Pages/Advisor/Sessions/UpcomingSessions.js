import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import PaginationTable from "../PaginationTable";
import moment from "moment";
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

		api.getUpcomingSessionsForAdvisor(this.props.user['user_id']).then((info) => {
			let sessions = info['data'];
			console.log(sessions);
			this.setState({sessions: sessions});
		}).catch((error) => {

		});
	}


	render()
	{
		let headerNames = ['locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];
		let rowIndexes = ['locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];

		let test_sessions = this.state.sessions;

		if(test_sessions !== undefined)
		{
			for(let i = 0; i < test_sessions.length; i++)
			{
				test_sessions[i]['start_time'] = moment(test_sessions[i]['start_time']).utc().format(`YYYY-MM-DD HH:mm:ss`);
				test_sessions[i]['end_time'] = moment(test_sessions[i]['end_time']).utc().format(`YYYY-MM-DD HH:mm:ss`);
			}
		}

		return (
			<div>
				<Typography variant="h3" align="center" style={{marginTop: '20px'}}>Upcoming Advising Appointments</Typography>
				{this.state.sessions.length === 0 ?
					<Typography variant="h5" align="center" style={{marginTop: '60px'}}>No Upcoming Appointments</Typography> :
					<PaginationTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.sessions}/>
				}
			</div>
		);
	}
}

export default AllSessions;
