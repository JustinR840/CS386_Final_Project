import React, { Component } from 'react';

import API from "../../APIInterface/APIInterface.js";
import Header from "../Landing/Header";
import {withRouter} from "react-router-dom";


class Advisees extends Component
{
	constructor(props)
	{
		super(props);

		let user = null;

		if(this.props.location.state !== null)
		{
			user = this.props.location.state.user;
		}

		this.state = {
			user: user,
			advisees: []
		};
	}


	componentDidMount ()
	{
		if(this.state.user !== null && this.state.user !== undefined)
		{
			const api = new API();

			api.getAdviseesForAdvisor(this.state.user['user_id']).then((info) => {
				let advisees = info['data'];
				this.setState({advisees: advisees});
			}).catch((error) => {

			});
		}
	}


	showAdvises()
	{
		return this.state.advisees.map((v, idx) => <p key={idx}>{v.student_id} {v.student_fName} {v.student_lName} {v.acad_plan} </p>);
	}


	render()
	{
		return (
			<div>
				<Header menuName="Test Pls" itemNames={['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc']} userName={"asdf"} userType={"qwerty"}/>
				<div>{this.showAdvises()}</div>
			</div>
		);
	}
}

export default withRouter(Advisees);
