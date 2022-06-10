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

	static async getMyBooks({sortBy = 5, status = "0"}) {
		return api.get(`${API_URL}/profile/lists/books?sortBy=${sortBy}&status=${status}`)
	}

	static async getMyAudioBooks({sortBy = 5, status = "0"}) {
		return api.get(`${API_URL}/profile/lists/audio-books?sortBy=${sortBy}&status=${status}`)
	}

	static async getBooksByLetter({letter, type, page = 1}) {
		return axios.get(`${API_URL}/books/filter?alphabetTitleIndex=${encodeURI(letter)}&type=${type}&page=${page}`)
	}

	static async getBookById(id, type) {
		return type === 'books' ?
			axios.get(`${API_URL}/books/${id}`) :
			axios.get(`${API_URL}/audio-books/${id}`)
	}

	static async getBooksByAuthor(id) {
		return axios.get(`${API_URL}/authors/${id}/books`)
	}

	static async getAudioBooksByAuthor(id) {
		return axios.get(`${API_URL}/authors/${id}/audio-books`)
	}

	static async getSimilarBooks(id, type) {
		return axios.get(`${API_URL}/${type === 'books' ? 'books' : 'audio-books'}/${id}/similar`)
	}

	static async getBookQuotes(id) {
		return axios.get(`${API_URL}/books/${id}/quotes`)
	}

	static async setBookStatus({id, value, type}) {
		const idKey = type === 'books' ? 'book_id' : 'audio_book_id'
		return api.put(`${API_URL}/profile/lists/${type}`, { [idKey]: id, status: value })
	}

	static async deleteBookFromFavorite({id, type}) {
		const idKey = type === 'books' ? 'book_id' : 'audio_book_id'
		return api.delete(`${API_URL}/profile/lists/${type}?book_id=${id}`, { [idKey]: id })
	}

	static async setBookRating({id, value}) {
		return api.post(`${API_URL}/books/ratings`, {book_id: id, rating: value})
	}

	static async recommendBook(data) {
		return api.post(`${API_URL}/users-recommend`, data)
	}

	static async audioBookChapters(audiobook) {
		return axios.get(`${API_URL}/audio-books/${audiobook}/chapters`)
	}
}