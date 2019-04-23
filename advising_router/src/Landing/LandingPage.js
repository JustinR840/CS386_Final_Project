import React, { Component } from 'react';
import Header from './Header.js'




class LoginPage extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];

		return (
			<Header menuName="My Advisors" itemNames={AdvisorNames}/>
		);
	}
}

export default LoginPage;