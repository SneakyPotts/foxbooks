import axios from "axios";
import api, { API_URL } from ".";

export default class BookService {
	static async getCategories() {
		return axios.get(`${API_URL}/genres`)
	}

	static async getBooks({
		type = 'books',
		page = 1,
		findByCategory = '',
		showType = 'block',
		sortBy = 3,
		findByAuthor = '',
		findByPublisher = '',
		findByTitle = '',
		alphabetAuthorIndex = '',
		alphabetPublisherIndex = '',
		alphabetTitleIndex = ''
	}) {
		return axios.get(`${API_URL}/books?
			${type && `&type=${type}`}
			${page && `&page=${page}`}
			${findByCategory && `&findByCategory=${findByCategory}`}
			${showType && `&showType=${showType}`}
			${sortBy && `&sortBy=${sortBy}`}
			${findByAuthor && `&findByAuthor=${findByAuthor}`}
			${findByPublisher && `&findByPublisher=${findByPublisher}`}
			${findByTitle && `&findByTitle=${findByTitle}`}
			${alphabetAuthorIndex && `&alphabetAuthorIndex=${alphabetAuthorIndex}`}
			${alphabetPublisherIndex && `&alphabetPublisherIndex=${alphabetPublisherIndex}`}
			${alphabetTitleIndex && `&alphabetTitleIndex=${alphabetTitleIndex}`}
		`)
	}

	static async getBookById(id) {
		return axios.get(`${API_URL}/books/${id}`)
	}

	static async setBookStatus({id, value}) {
		return api.put(`${API_URL}/books/save?book_id=${id}&status=${value}`)
	}

	static async setBookRating({id, value}) {
		return api.post(`${API_URL}/ratings?book_id=${id}&rating=${value}`)
	}
}