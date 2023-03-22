import axios from "axios";
import { API_URL } from ".";

export default class CategoriesService {
	static async getCategories() {
		return axios.get(`${API_URL}/genres`)
	}

	static async getAudioCategories() {
		return axios.get(`${API_URL}/audio-books/genres`)
	}

	static async getCategoriesBooks() {
		return axios.get(`${API_URL}/genres/books/sidebar`)
	}

	static async getCategoriesWithCount() {
		return axios.get(`${API_URL}/genres/books`)
	}

	static async getAudioCategoriesWithCount() {
		return axios.get(`${API_URL}/genres/audio-books`)
	}

	static async getBookCategories(slug) {
		return axios.get(`${API_URL}/genres/by-slug/${slug}`)
	}

	static async getAudioBookCategoriesData() {
		return axios.get(`${API_URL}/genres/audio-books`)
	}
}
