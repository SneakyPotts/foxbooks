import axios from "axios";
import api, { API_URL } from ".";

export default class AuthorService {
	static async getAuthor(slug) {
		return axios.get(`${API_URL}/authors/${slug}`)
	}

	static async getAuthorsByLetter({letter, page}) {
		return axios.get(`${API_URL}/authors/filter?letter=${encodeURI(letter)}&page=${page}`)
	}

	static async getAuthorBooks(id) {
		return axios.get(`${API_URL}/authors/${id}/books`)
	}

	static async getAuthorSeries({token, id}) {
		return axios.get(`${API_URL}/authors/series/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
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

	static async getUserAuthors({letter = '', page = 1}) {
		return api.get(`${API_URL}/profile/lists/authors?page=${page}${letter && `&letter=${letter}`}`)
	}

	static async getAuthorQuotes(slug) {
		return axios.get(`${API_URL}/authors/${slug}/quotes`);
	}

	static async getAuthorReviews(slug) {
		return axios.get(`${API_URL}/authors/${slug}/reviews`);
	}
}