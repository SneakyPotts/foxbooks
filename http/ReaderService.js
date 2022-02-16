import axios from "axios";
import api, { API_URL } from ".";

export default class ReaderService {
	static async getBookRead(id, page) {
		return axios.get(`${API_URL}/books/${id}/read?pageNumber=${page}`)
	}

	static async getBookChapters(id) {
		return axios.get(`${API_URL}/books/${id}/chapters`)
	}

	static async getBookMarks(id) {
		return api.get(`${API_URL}/books/${id}/bookmarks`)
	}

	static async getBookQuotes({id, my, search}) {
		return api.get(`${API_URL}/quotes?bookId=${id}
			${my && `&myQuotes=${my}`}
			${search && `&search=${search}`}
		`)
	}
}