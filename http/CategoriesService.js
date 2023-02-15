import axios from "axios";
import {API_URL, API_URL_L} from ".";

export default class CategoriesService {
	static async getCategories() {
		return axios.get(`${API_URL}/genres`)
	}

	static async getAudioCategories() {
		return axios.get(`${API_URL}/audio-books/genres`)
	}

	static async getCategoriesWithCount(ssr = false) {
		console.log('getCategoriesWithCount', `${ssr ? API_URL_L : API_URL}/genres/books`)
		console.log('LOCAL REQUEST',axios.get(`${API_URL_L}/genres/books`))
		return axios.get(`${ssr ? API_URL_L : API_URL}/genres/books`)
	}

	static async getAudioCategoriesWithCount() {
		return axios.get(`${API_URL}/genres/audio-books`)
	}

	static async getBookCategories({slug, ssr = false}) {
		console.log('getBookCategories', `${ssr ? API_URL_L : API_URL}/genres/by-slug/${slug}`)
		return axios.get(`${ssr ? API_URL_L : API_URL}/genres/by-slug/${slug}`)
	}

	static async getAudioBookCategoriesData() {
		return axios.get(`${API_URL}/genres/audio-books`)
	}
}
