import React, { Component } from 'react';

import API from "../../../APIInterface/APIInterface.js";
import PaginationTable from "../PaginationTable";


class MyBlocks extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			blocks: []
		};
	}


	componentDidMount ()
	{
		const api = new API();

		api.getAdvisorAdvisingBlocks(this.props.user['user_id']).then((info) => {
			let blocks = info['data'];
			this.setState({blocks: blocks});
		}).catch((error) => {

		});
	}


	render()
	{
		// let headerNames = ['Student ID', "First Name", "Middle Name", "Last Name", "Term", "Acad. Plan", "Advisor ID"];
		let rowIndexes = ['advisor_id', 'block_id', 'end_time', 'num_session', 'start_time'];

		console.log(this.state.blocks);

		return (
			<div>
				<PaginationTable headerNames={rowIndexes} rowIndexes={rowIndexes} rows={this.state.blocks}/>
			</div>
		);
	}
}

export default MyBlocks;
