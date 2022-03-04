import axios from "axios";
import api, { API_URL } from ".";

export default class SearchService {
	static async search({str, type}) {
		return axios.get(`${API_URL}/search?search=${str}&type=${type}`)
	}
}