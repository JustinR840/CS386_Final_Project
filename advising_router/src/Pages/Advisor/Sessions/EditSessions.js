import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import SessionEditorPaginationTable from "./SessionEditorPaginationTable.js";
import SessionEditor from "./SessionEditor.js";


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


	render()
	{
		let headerNames = ['EDIT', 'status', 'advisor_id', 'student_id', 'start_time', 'end_time', 'session_id', 'block_id', 'locked', 'num_sessions', 'notes'];
		let rowIndexes  = ['edit', 'status', 'advisor_id', 'student_id', 'start_time', 'end_time', 'session_id', 'block_id', 'locked', 'num_sessions', 'notes'];

		return (
			<div>
				{
					this.state.editingSession === true ?
						<SessionEditor session={this.state.sessions[this.state.editingSessionNumber]} doneEditingSession={this.doneEditingSession} /> :
						<SessionEditorPaginationTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.sessions} editButtonOnClick={this.editButtonOnClick}/>
				}
			</div>
		);
	}
}

export default EditSessions;
