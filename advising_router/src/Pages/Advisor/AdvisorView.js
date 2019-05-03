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

	render()
	{
		return (
			<div>AAAAA</div>
		);
	}
}

export default AdvisorView;