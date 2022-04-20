import axios from "axios";
import api, { API_URL } from ".";

export default class AuthorService {
	static async getAuthor(id) {
		return axios.get(`${API_URL}/authors/${id}`)
	}

	static async getAuthorsByLetter({letter, page}) {
		return axios.get(`${API_URL}/authors/letter/${encodeURI(letter)}?page=${page}`)
	}

	static async getAuthorBooks(id) {
		return axios.get(`${API_URL}/authors/${id}/books`)
	}

	static async getAuthorSeries(id) {
		return axios.get(`${API_URL}/authors/series/${id}`)
	}

	static async getAuthorAudioBooks(id) {
		return axios.get(`${API_URL}/authors/${id}/audio-books`)
	}

	static async addAuthorToFavorite(id) {
		return api.post(`${API_URL}/profile/lists/authors`, { author_id: id })
	}

	static async deleteAuthorFromFavorite(id) {
		return api.delete(`${API_URL}/profile/lists/authors?author_id=${id}`, { author_id: id })
	}

	static async getUserAuthors({letter = ''}) {
		return api.get(`${API_URL}/profile/lists/authors${letter && `?letter=${letter}`}`)
	}
}