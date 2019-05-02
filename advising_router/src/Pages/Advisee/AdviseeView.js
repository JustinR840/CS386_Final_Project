import React, { Component } from 'react';

import API from "../../APIInterface/APIInterface.js";


class AdviseeView extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			advisee: props.advisee,
			advisors: []
		};
	}

	componentDidMount ()
	{
		if(this.state.advisee !== null)
		{
			// Axios call
			let api = new API();

			api.getAdvisorsForAdvisee(this.state.advisee['user_id']).then((info) =>
			{
				let arr = info['data'];

				if(arr !== null)
				{
					// console.log(arr);
					this.setState({advisors: arr});
				}
				else
				{
					this.setState({advisors: []});
				}

			}).catch((error) =>
			{
			});
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
