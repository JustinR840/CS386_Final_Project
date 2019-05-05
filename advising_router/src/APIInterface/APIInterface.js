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
