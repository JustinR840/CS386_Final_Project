import React, { Component } from 'react';
import Header from './Header.js'

import AdvisorView from '../Advisor/AdvisorView.js';


class LandingPage extends Component
{
	render()
	{
		let userName = 'Erei';
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
		let user = this.props.user;

		return (
			<div>
				<Header menuName="My Advisors" itemNames={AdvisorNames} userName={userName} userType={user !== null ? user['role'] : "none"}/>
				{
					user !== null ? user['role'] === "advisor" ? <AdvisorView advisor={user}/> : "ROLE NOT ADVISOR" : "USER WAS NULL"
				}
			</div>
		);
	}
}

export default LandingPage;