import axios from "axios";
import api, { API_URL } from ".";

export default class BookService {
	static async getBooks({
		type = 'books',
		page = 1,
		findByCategory = '',
		showType = 'block',
		sortBy = 1,
		findByAuthor = '',
		findByPublisher = '',
		findByTitle = '',
		alphabetAuthorIndex = '',
		alphabetPublisherIndex = '',
		alphabetTitleIndex = ''
	}) {
		return axios.get(`${API_URL}/books?${type && `type=${type}`}
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

	static async getBooksByLetter(letter) {
		return axios.get(`${API_URL}/books/letter/${encodeURI(letter)}`)
	}

	static async getBookById(id, type) {
		return type === 'books' ?
			axios.get(`${API_URL}/books/${id}`) :
			axios.get(`${API_URL}/audio-books/${id}`)
	}

	static async setBookStatus({id, value}) {
		return api.get(`${API_URL}/users/books?book_id=${id}&status=${value}`)
	}

	static async setBookRating({id, value}) {
		return api.post(`${API_URL}/ratings?book_id=${id}&rating=${value}`)
	}
}