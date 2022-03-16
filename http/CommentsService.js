import axios from "axios";
import api, { API_URL } from ".";

export default class CommentsService {
	static async getComments({
		id,
		type,
		perpage = 10,
	}) {
		let t = type

		if(type === 'books') {
			t = 'book'
		} else if(type === 'audioBooks') {
			t = 'audio_books'
		}

		return axios.get(`${API_URL}/comments/${t}/${id}?perpage=${perpage}`)
	}

	static async addComment(data) {
		return api.post(`${API_URL}/comments`,data)
	}
}