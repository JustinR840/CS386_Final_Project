import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import Table from "../Table";


class PastSessions extends Component
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

    api.getAdviseeCancelledSessions(this.props.user['user_id']).then((info) => {
      let sessions = info['data'];

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
			temp.push({start: start, cancelled_by: element['cancelled_by'], advisor: name, notes: element['notes']});
		});

		let headerNames = ['Cancelled By', 'Session Start', 'Advisor', 'Notes'];
		let rowIndexes = ['cancelled_by', 'start', 'advisor', 'notes'];

		return (
      <div>
        <h2 style={{paddingLeft: 8}}>Cancelled Sessions</h2>
				{temp.length > 0 ? (
        <Table titles={headerNames} attributes={rowIndexes} tuples={temp}/>
      ) : (
        <p style={{paddingLeft: 8}}>No Cancelled Sessions</p>
      )}
			</div>
		);
	}
}

export default PastSessions;
