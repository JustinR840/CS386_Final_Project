import React, { Component } from 'react';

import API from "../../APIInterface/APIInterface.js";


class AdviseeView extends Component
{
	constructor(props)
	{
		console.log("props: ", props)
		super(props);
		this.state = {
			advisee: props.advisee,
			advisors: props.advisors
		};
	}

	componentDidMount ()
	{
		if(this.state.advisee !== null)
		{

		}
	}

	showAdvisors()
	{
		return this.state.advisors.map((v, idx) => <p>{v.advisor_id} {v.advisor_fName} {v.advisor_lName}</p>);
	}

	render()
	{
		return (
			<div>{this.showAdvisors()}</div>
		);
	}
}

export default AdviseeView;
