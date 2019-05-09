import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import SessionEditorPaginationTable from "./SessionEditorPaginationTable.js";
import SessionEditor from "./SessionEditor.js";
import {Typography} from "@material-ui/core";


class EditSessions extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			sessions: [],
			editingSession: false,
			editingSessionNumber: 0
		};

		this.editButtonOnClick = this.editButtonOnClick.bind(this);
		this.doneEditingSession = this.doneEditingSession.bind(this);
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


	doneEditingSession()
	{
		this.setState({editingSession: false});
	}


	editButtonOnClick(sessionNumber)
	{
		this.setState({editingSession: true, editingSessionNumber: sessionNumber});
	}


	getHTMLToReturn()
	{
		if(this.state.editingSession === true)
		{
			return (
				<div>
					<Typography variant="h3" align="center" style={{marginTop: '20px'}}>Edit Advising Appointments</Typography>
					<SessionEditor session={this.state.sessions[this.state.editingSessionNumber]} doneEditingSession={this.doneEditingSession} />
				</div>
			);
		}
		else
		{
			let headerNames = ['EDIT', 'locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];
			let rowIndexes = ['edit', 'locked', 'status', 'block_id', 'start_time', 'student_id', 'notes'];

			return (
				<div>
					<Typography variant="h3" align="center" style={{marginTop: '20px'}}>Choose An Advising Appointment</Typography>
					<SessionEditorPaginationTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.sessions} editButtonOnClick={this.editButtonOnClick}/>
				</div>
			);
		}
	}


	render()
	{
		return this.getHTMLToReturn();
	}
}

export default EditSessions;
