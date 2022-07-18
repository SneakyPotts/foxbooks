import axios from "axios";
import api, { API_URL } from ".";

export default class SearchService {
	static async search({search, type}) {
		return axios.get(`${API_URL}/search?search=${encodeURI(search)}&type=${type}`)
	}
}