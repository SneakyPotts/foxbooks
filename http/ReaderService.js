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

	static async getBookQuotes({id, my, search}) {
		return api.get(`${API_URL}/quotes?bookId=${id}
			${my && `&myQuotes=${my}`}
			${search && `&search=${search}`}
		`)
	}

	static async addBookQuote(data) {
		const obj = {
			book_id: data?.book_id,
			page_id: data?.page_id,
			text: data?.text,
			color: data?.color,
			start_key: data?.startKey,
			start_offset: data?.startOffset,
			end_key: data?.endKey,
			end_offset: data?.endOffset
		}
		return api.post(`${API_URL}/quotes`, obj)
	}

	static async editBookQuote(data) {
		return api.put(`${API_URL}/quotes`, data)
	}

	static async deleteBookQuote(id) {
		return api.delete(`${API_URL}/quotes?quoteId=${id}`)
	}

	static async getMyQuotes(sortBy = 1) {
		return api.get(`${API_URL}/profile/lists/quotes?sortBy=${sortBy}`)
	}

	static async getSettings() {
		return api.get(`${API_URL}/reading_settings`)
	}

	static async updateSettings(data) {
		const obj = {
			is_two_columns: data.isTwoColumns,
			font_size: data.fontSize,
			screen_brightness: data.screenBrightness,
			font_name: data.fontName,
			field_size: data.fieldSize,
			row_height: data.rowHeight,
			is_center_alignment: data.isCenterAlignment
		}
		return api.put(`${API_URL}/reading_settings`, obj)
	}
}