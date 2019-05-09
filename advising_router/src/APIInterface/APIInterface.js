import Axios from '../config/ConfigAxios';
import crypto from "crypto";

const axios = Axios();

class APIInterface {

	async getUserInfo(user_id, password) {
		let password_hash = crypto.createHash('md5').update(password).digest('hex');

		return axios.post(`login`, {user_id: user_id, password_hash: password_hash});
	}

	async createNewBlock(advisor_id, block_information)
	{
		return axios.post(`advisors/${advisor_id}/blocks`, {post_data: block_information});
	}

	async getPastSessionsForAdvisor(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}/past_sessions`);
	}

	async getFutureSessionsForAdvisor(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}/future_sessions`);
	}

	async getUpcomingSessionsForAdvisor(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}/upcoming_sessions`);
	}
	
	async getAdvisorAdvisingBlocks(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}/blocks`);
	}

	async getAdvisorsForAdvisee(user_id){
		return axios.get(`advisees/${user_id}/advisors`);
	}

	async getAllSessionsForAdvisor(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}/sessions`);
	}

	async getAdviseeAdvisorOpenSessions(user_id){
		return axios.get(`advisees/${user_id}/open`);
	}

	async getAdviseeUpcomingSessions(user_id){
		return axios.get(`advisees/${user_id}/sessions`);
	}

	async getAdviseePastSessions(user_id){
		console.log('u',user_id);
		return axios.get(`advisees/${user_id}/pastsessions`);
	}

	async getAdviseeCancelledSessions(user_id){
		return axios.get(`advisees/${user_id}/cancelledsessions`)
	}

	async getAllAdvisees()
	{
		return axios.get(`advisees/`);
	}

	async getAdviseesForAdvisor(advsor_id)
	{
		return axios.get(`advisors/${advsor_id}/advisees`);
	}


	async getAdvisorInformation(advisor_id)
	{
		return axios.get(`advisors/${advisor_id}`)
	}

	async keepAlive() {
		return axios.get('students/keep-alive');
	}

}
export default APIInterface
