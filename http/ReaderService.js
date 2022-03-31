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

	static async addBookMark({book_id, page_id}) {
		return api.post(`${API_URL}/bookmarks`, {book_id, page_id})
	}

	static async deleteBookMark(id) {
		return api.delete(`${API_URL}/bookmarks/${id}`)
	}

	static async addBookQuote(data) {
		console.log('data',data)
		const obj = {
			book_id: data?.book_id,
			page_id: data?.page_id,
			text: data?.text,
			color: data?.color,
			start_key: data?.startKey,
			start_text_index: data?.startTextIndex,
			start_offset: data?.startOffset,
			end_key: data?.endKey,
			end_text_index: data?.endTextIndex,
			end_offset: data?.endOffset
		}
		return api.post(`${API_URL}/quotes`, obj)
	}

	static async getBookQuotes({id, my, search}) {
		return api.get(`${API_URL}/quotes?bookId=${id}
			${my && `&myQuotes=${my}`}
			${search && `&search=${search}`}
		`)
	}

	static async getSettings() {
		return api.get(`${API_URL}/reading_settings`)
	}

	static async updateSettings(data) {
		return api.put(`${API_URL}/reading_settings`, data)
	}
}