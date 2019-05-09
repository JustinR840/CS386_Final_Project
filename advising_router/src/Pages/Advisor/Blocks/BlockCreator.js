import React, { Component } from 'react';

import BlockCreatorBox from "./BlockCreatorBox.js"
import API from "../../../APIInterface/APIInterface.js";

const moment = require('moment');


Date.prototype.addMinutes = function(m) {
	this.setTime(this.getTime() + (m*60*1000));
	return this;
};

Date.prototype.addSeconds = function(s) {
	this.setTime(this.getTime() + (s*1000));
	return this;
};


class BlockCreator extends Component
{
	constructor(props)
	{
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(data)
	{
		let { start_time, session_length, num_sessions } = data;

		let block_start_time = require('moment')(new Date(start_time)).format('YYYY-MM-DD HH:mm:ss');
		let block_end_time = moment((new Date(start_time).addMinutes(session_length * num_sessions)).addSeconds(-1)).format('YYYY-MM-DD HH:mm:ss');

		let sessions = [];
		for(let i = 0; i < num_sessions; i++)
		{
			let session_start_time = new Date(start_time).addMinutes(i * session_length);
			sessions.push(require('moment')(session_start_time).format('YYYY-MM-DD HH:mm:ss'));
		}

		let new_block_information = {
			start_time: block_start_time,
			end_time: block_end_time,
			sessions: sessions
		};

		const api = new API();

		api.createNewBlock(this.props.user['user_id'], new_block_information).then(value => {
			console.log("POSTED");
			console.log(value);
		}).catch( error =>
		{
			console.log("NOT POSTED: ERROR");
			console.log(error);
		});
	};

	render()
	{
		return <BlockCreatorBox handleSubmit={this.handleSubmit}/>
	}
}

export default BlockCreator;
