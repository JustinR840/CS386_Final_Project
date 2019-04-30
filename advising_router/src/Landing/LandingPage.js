import React, { Component } from 'react';
import Header from './Header.js'




class LandingPage extends Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
      console.log(AdvisorNames)
		return (

			<Header menuName="My Advisors" itemNames={AdvisorNames}/>
		);
	}
}

export default LandingPage;
