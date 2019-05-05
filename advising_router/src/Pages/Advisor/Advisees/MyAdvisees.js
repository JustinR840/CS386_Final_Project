import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import MaterialTable from "../MaterialTable";


class MyAdvisees extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			advisees: []
		};
	}


	componentDidMount ()
	{
		const api = new API();

		api.getAdviseesForAdvisor(this.props.user['user_id']).then((info) => {
			let advisees = info['data'];
			this.setState({advisees: advisees});
		}).catch((error) => {

		});
	}


	render()
	{
		let headerNames = ['Student ID', "First Name", "Middle Name", "Last Name", "Term", "Acad. Plan", "Advisor ID"];
		let rowIndexes = ['student_id', 'student_fName', 'student_mName', 'student_lName', 'term', 'acad_plan', 'advisor_id'];

		return (
			<div>
				<MaterialTable headerNames={headerNames} rowIndexes={rowIndexes} rows={this.state.advisees}/>
			</div>
		);
	}
}

export default MyAdvisees;
