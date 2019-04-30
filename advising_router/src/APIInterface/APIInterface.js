import Axios from '../config/ConfigAxios';
import crypto from "crypto";

const axios = Axios();

class APIInterface {

	async getUserInfo(user_id, password) {
		let password_hash = crypto.createHash('md5').update(password).digest('hex');
		console.log("Hash of " + password + " is " + password_hash);

		let config = {
			headers: {
				user_id: user_id,
				password_hash: password_hash
			}
		};

		return axios.get(`login`, config);

	}

	async getAdvisor(user_id){
		return axios.get(`advisees/${user_id}/advisors`);
	}

	async getCourses(term, subject) {
		console.log('getCourses', term, subject);
		return axios.get(`courses/${term}/${subject}/term-subject`);

	}

	async keepAlive() {
		return axios.get('students/keep-alive');
	}

}
export default APIInterface
