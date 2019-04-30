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
		let userName = 'Erei';
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];

		console.log(AdvisorNames);

		return (
			<Header menuName="My Advisors" itemNames={AdvisorNames} userName={userName}/>
		);
	}
}

export default LoginPage;