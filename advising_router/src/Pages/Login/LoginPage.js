import React, { Component } from 'react';

import LoginBox from "./LoginBox.js"
import API from "../../APIInterface/APIInterface.js";


class LandingPage extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			setUser: this.props.setUser,
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

		const api = new API();

		api.getUserInfo(this.state.user_id, this.state.password).then((info) =>
		{

			let user = info['data']['user'];
			if(user !== null)
			{
				// TODO: Remove me
				console.log("LOGIN SUCCESS");
				console.log(info);
				this.state.setUser(user);
				this.setState({info_error: false});
			}
			else
			{
				// TODO: Remove me
				console.log("LOGIN FAIL");
				this.setState({info_error: true});
			}

		}).catch((error) =>
		{
			// What kind of error should be here?
		});
	};

	render()
	{
		return (
			<LoginBox handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} info_error={this.state.info_error}/>
		);
	}
}

export default LandingPage;