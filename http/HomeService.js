import axios from "axios";
import { API_URL } from ".";

export default class HomeService {
	static async getHomeData() {
		return axios.get(`${API_URL}/home?sortBy=3`)
	}
}