import React, { Component } from 'react';

import API from "../../APIInterface/APIInterface.js";


class AdvisorView extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			advisor: props.advisor,
			advisees: []
		};
	}

	componentDidMount ()
	{
		if(this.state.advisor !== null)
		{
			// Axios call
			let api = new API();

			api.getAdviseesForAdvisor(this.state.advisor['user_id']).then((info) =>
			{
				let arr = info['data'];

				if(arr !== null)
				{
					// console.log(arr);
					this.setState({advisees: arr});
				}
				else
				{
					this.setState({advisees: []});
				}

			}).catch((error) =>
			{
			});
		}
	}

	showAdvises()
	{
		return this.state.advisees.map((v, idx) => <p>{v.student_id} {v.student_fName} {v.student_lName} {v.acad_plan} </p>);
	}

	render()
	{
		return (
			<div>{this.showAdvises()}</div>
		);
	}
}

export default AdvisorView;