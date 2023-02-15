import axios from 'axios'
import Cookies from 'js-cookie'

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create()

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${Cookies.get('token')}`
	return config;
})

export default api;
