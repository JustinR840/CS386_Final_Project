import axios from 'axios';

export default () => {
	// Indicate to the API that all requests for this app are AJAX
	axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	// Set the baseURL for all requests to the API domain instead of the current domain
	axios.defaults.baseURL = `http://blue.cs.sonoma.edu:8121/api/v1`;

	// Allow the browser to send cookies to the API domain (which include auth_token)
	axios.defaults.withCredentials = true;

	return axios;
}
