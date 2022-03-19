import axios from "axios";
import api, { API_URL } from ".";

export default class CommonService {
	static async sendSupport(data) {
		return axios.post(`${API_URL}/support`, data)
	}
}