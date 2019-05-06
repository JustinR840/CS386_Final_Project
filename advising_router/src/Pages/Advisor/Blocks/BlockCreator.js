import React, { Component } from 'react';

import BlockCreatorBox from "./BlockCreatorBox.js"
import API from "../../../APIInterface/APIInterface.js";


class BlockCreator extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			start_time: null,
			end_time: null,
			num_sessions: null,
			info_error: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange = event =>
	{
		// event.target.id has been constructed to either be user_id or password
		// so we can directly use it to index the state object. This means
		// we only need this one function to update the state for user_id and password.
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	getDateInfo(dateString)
	{
		let a = dateString.split('T');

		let date = a[0].split('-');
		let time = a[1].split(':');

		return {
			year: date[0],
			month: date[1],
			day: date[2],
			hour: time[0],
			minute: time[1]
		}
	}

	handleSubmit = event =>
	{
		event.preventDefault();

		console.log(this.state.start_time);
		console.log(this.state.end_time);
		console.log(this.state.num_sessions);

		let start_date = this.getDateInfo(this.state.start_time);
		console.log(start_date);

		const api = new API();

		api.createNewBlock(this.props.user['user_id'], start_date).then(value => {
			console.log("POSTED");
			console.log(value);
		}).catch( error =>
		{
			console.log("NOT POSTED: ERROR");
			console.log(error);
		});

		// const api = new API();
		//
		// api.getUserInfo(this.state.user_id, this.state.password).then((info) =>
		// {
		//
		// 	let user = info['data']['user'];
		// 	if(user !== null)
		// 	{
		// 		// Login success
		// 		this.state.setUser(user);
		// 	}
		// 	else
		// 	{
		// 		// Login fail
		// 		this.setState({info_error: true});
		// 	}
		//
		// }).catch((error) =>
		// {
		// 	// What kind of error should be here?
		// });
	};

	render()
	{
		return <BlockCreatorBox handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} info_error={this.state.info_error}/>;
	}
}

export default BlockCreator;
