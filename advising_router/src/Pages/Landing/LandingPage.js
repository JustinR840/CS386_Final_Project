import React, { Component } from 'react';
import Header from './Header.js'
import API from "../../APIInterface/APIInterface.js";




class LandingPage extends Component
{
	render()
	{
		const api = new API();

		let userName = 'Erei';
		let AdvisorNames = ['Dr. Zik', 'Dr. Yolopanther', 'Dr. Doc'];
		let user_type = this.props.userType;
		console.log("hi",this.props);

		if(user_type === 'advisee'){
			console.log('hi');
			api.getAdvisor(this.props.user_id).then((info) =>
			{
				let advisor = info['data'];
				console.log(advisor);
			}).catch((error) =>
			{
				// What kind of error should be here?
			});
		}

		return (
			<Header menuName="My Advisors" itemNames={AdvisorNames} userName={userName} userType={user_type}/>
		);
	}
}

export default LandingPage;
