import axios from "axios";
import { API_URL } from ".";

export default class HomeService {
	static async getHomeCategories() {
		return axios.get(`${API_URL}/genres`)
	}
}