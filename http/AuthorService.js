import axios from "axios";
import { API_URL } from ".";

export default class AuthorService {
	static async getAuthor(id) {
		return axios.get(`${API_URL}/authors/page?id=${id}`)
	}

	static async getAuthorBooks(id) {
		return axios.get(`${API_URL}/authors/${id}/books`)
	}

	static async getAuthorAudioBooks(id) {
		return axios.get(`${API_URL}/authors/${id}/audio-books`)
	}
}