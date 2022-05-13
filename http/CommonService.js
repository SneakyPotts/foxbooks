import axios from "axios";
import api, { API_URL } from ".";

export default class CommonService {
	static async sendSupport(data) {
		return axios.post(`${API_URL}/support`, data)
	}

	static async sendClaim(data) {
		return axios.post(`${API_URL}/claim`, data)
	}

	static async getMyListCounters() {
		return api.get(`${API_URL}/profile/lists/counter`)
	}
}