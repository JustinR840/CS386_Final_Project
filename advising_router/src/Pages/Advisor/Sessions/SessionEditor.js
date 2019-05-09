import React, { Component } from 'react';

import SessionEditorBox from "./SessionEditorBox";


class SessionEditor extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			sessions: []
		};
	}

	render()
	{

		let { doneEditingSession } = this.props;

		return (
			<div>
				<SessionEditorBox handleSubmit={doneEditingSession}/>

			</div>
		);
	}
}

export default SessionEditor;
