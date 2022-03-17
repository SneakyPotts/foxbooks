import axios from "axios";
import api, { API_URL } from ".";

export default class CommentsService {
	static async getComments({
		id,
		type,
		page = 1
	}) {
		let t = type

		if(type === 'books') {
			t = 'book'
		} else if(type === 'audioBooks') {
			t = 'audio_books'
		}

		return axios.get(`${API_URL}/comments/${t}/${id}?perpage=3&page=${page}`)
	}

	static async getReplyComments({
		id,
		type,
		page = 1
	}) {
		let t = type

		if(type === 'books') {
			t = 'book'
		} else if(type === 'audioBooks') {
			t = 'audio_books'
		}

		return axios.get(`${API_URL}/comments/${id}?type=${t}&perpage=3&page=${page}`)
	}

	static async addComment(data) {
		return api.post(`${API_URL}/comments`,data)
	}
}