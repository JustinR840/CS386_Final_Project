import React, { Component } from 'react';

import LoginBox from "./LoginBox.js"
import {Redirect} from "react-router-dom";


class LandingPage extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			user_id: "",
			password: "",
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

	handleSubmit = event =>
	{
		event.preventDefault();

		// TODO: Check against database
		let info_error = false;

		if(this.state.user_id !== "004")
		{
			info_error = true;
		}

		this.setState({info_error: info_error});
	};

	render()
	{
		return (
			<LoginBox handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} info_error={this.state.info_error}/>
		);
	}
}

export default LandingPage;