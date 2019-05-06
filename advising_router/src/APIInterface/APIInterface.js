import Axios from '../config/ConfigAxios';
import crypto from "crypto";

const axios = Axios();

class APIInterface {

	async getUserInfo(user_id, password) {
		let password_hash = crypto.createHash('md5').update(password).digest('hex');

		let config = {
			headers: {
				user_id: user_id,
				password_hash: password_hash
			}
		};

		return axios.get(`login`, config);

	}

	async createNewBlock(advisor_id, block_information)
	{
		return axios.post(`advisors/${advisor_id}/blocks`, block_information);
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
	
	async getAdviseeUpcomingSessions(user_id){
		return axios.get(`advisees/${user_id}/sessions`);
	}

	async getAdviseePastSessions(user_id){
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
