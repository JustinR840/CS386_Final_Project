import React, { Component } from 'react';
import Header from './Header.js'




class LandingPage extends Component
{
	render()
	{
		let userName = 'Erei';
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
		let user_type = this.props.userType;

		return (
			<Header menuName="My Advisors" itemNames={AdvisorNames} userName={userName} userType={user_type}/>
		);
	}
}

export default LandingPage;