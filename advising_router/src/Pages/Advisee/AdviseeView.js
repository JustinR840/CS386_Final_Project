import React, { Component } from 'react';

import API from "../../APIInterface/APIInterface.js";
import Table from "./Table.js"

class AdviseeView extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			advisee: props.advisee,
			advisors: props.advisors,
			upcoming: props.upcoming,
			past: props.past,
			cancelled: props.cancelled,
			showing: "upcoming"
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
		return this.props.advisors.map((v, idx) => <p>{v.advisor_id} {v.advisor_fName} {v.advisor_lName}</p>);
	}

/*
	showUpcoming(){
		return this.props.upcoming.map((v, idx) => <p>{v.start_time} {v.advisor_fName} {v.advisor_lName}</p>);
	}
	*/

	render()
	{
		console.log("B",this.state.user);
		return (
			<div>{this.showAdvisors()}</div>
		);
	}
}

export default AdviseeView;
