import axios from "axios";
import api, { API_URL } from ".";

export default class BookService {
	static async getBooks({
		page = 1,
		showType = 'block',
		sortBy = 1,
		findByAuthor = '',
		findByPublisher = '',
		findByTitle = '',
	}) {
		return axios.get(`${API_URL}/books?
			${page && `&page=${page}`}
			${showType && `&showType=${showType}`}
			${sortBy && `&sortBy=${sortBy}`}
			${findByAuthor && `&findByAuthor=${findByAuthor}`}
			${findByPublisher && `&findByPublisher=${findByPublisher}`}
			${findByTitle && `&findByTitle=${findByTitle}`}
		`)
	}

	static async getBookById(id) {
		return axios.get(`${API_URL}/books/${id}`)
	}

	static async setBookRating({id, value}) {
		return api.post(`${API_URL}/ratings?book_id=${id}&rating=${value}`)
	}
}