import axios from 'axios';

const baseURL = '137.184.88.170/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});
export default axiosInstance;