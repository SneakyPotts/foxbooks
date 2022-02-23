import axios from "axios";
import { API_URL } from ".";

export default class CategoriesService {
	static async getCategories() {
		return axios.get(`${API_URL}/genres`)
	}

	static async getAudioCategories() {
		return axios.get(`${API_URL}/audio-books/genres`)
	}

	static async getCategoriesWithCount() {
		return axios.get(`${API_URL}/genres/books`)
	}

	static async getAudioCategoriesWithCount() {
		return axios.get(`${API_URL}/genres/audio-books`)
	}
}