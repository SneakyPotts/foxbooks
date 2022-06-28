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
			t = 'audio_book'
		}

		return api.get(`${API_URL}/comments/${t}/${id}?perpage=3&page=${page}`)
	}

	static async getReplyComments({
		id,
		type,
		page = 1,
		reviewBranch
	}) {
		let t = type

		if(type === 'books') {
			t = reviewBranch ? 'book_review' : 'book'
		} else if(type === 'audioBooks') {
			t = reviewBranch ? 'audio_review' : 'audio_book'
		}

		return api.get(`${API_URL}/comments/${id}?type=${t}&perpage=3&page=${page}`)
	}

	static async getReplyReviews({
		id,
		type,
		page = 1
	}) {
		let t = type

		if(type === 'books') {
			t = 'book_review'
		} else if(type === 'audioBooks') {
			t = 'audio_review'
		}

		return api.get(`${API_URL}/comments/book_review/${id}?type=${t}&perpage=3&page=${page}`)
	}

	static async addComment(data) {
		return api.post(`${API_URL}/comments`,data)
	}

	static async addLikeToComment(data) {
		return api.post(`${API_URL}/likes`, data)
	}

	static async deleteLikeFromComment(data) {
		return api.delete(`${API_URL}/likes?type=${data.type}&id=${data.id}`)
	}
}