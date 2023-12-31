import api, { API_URL } from '.';
import axios from 'axios';

export default class BookService {
  static async getBooks({
    token,
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
    alphabetTitleIndex = '',
  }) {
    return axios.get(
      `${API_URL}/books?${type && `type=${type}`}
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
			`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async getMyBooks({ sortBy = 5, status = '0', page = 1, findByTitle = '' }) {
    return api.get(`${API_URL}/profile/lists/books?sortBy=${sortBy}&status=${status}&page=${page}${findByTitle && `&findByTitle=${findByTitle}`}`);
  }

  static async getMyAudioBooks({ sortBy = 5, status = '0', page = 1, findByTitle = '' }) {
    return api.get(`${API_URL}/profile/lists/audio-books?sortBy=${sortBy}&status=${status}&page=${page}${findByTitle && `&findByTitle=${findByTitle}`}`);
  }

  static async getBooksByLetter({ letter, type, page = 1 }) {
    return axios.get(`${API_URL}/books/filter?alphabetTitleIndex=${encodeURI(letter)}&type=${type}&page=${page}`);
  }

  static async getBookById(id, type) {
    return type === 'books' ? axios.get(`${API_URL}/books/${id}`) : axios.get(`${API_URL}/audio-books/${id}`);
  }

  static async getAudioBookBySlug(slug, token) {
    return axios.get(`${API_URL}/audio-books/by-slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getBookBySlug(slug, token) {
    return axios.get(`${API_URL}/books/by-slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getBooksByAuthor({ id, book_id }) {
    return axios.get(`${API_URL}/authors/${id}/books?book_id=${book_id}`);
  }

  static async getAudioBooksByAuthor({ id, book_id }) {
    return axios.get(`${API_URL}/authors/${id}/audio-books?book_id=${book_id}`);
  }

  static async getSimilarBooks(id, type) {
    return axios.get(`${API_URL}/${type === 'books' ? 'books' : 'audio-books'}/${id}/similar`);
  }

  static async getBookQuotes(id, token, page = 1) {
    return axios.get(`${API_URL}/books/${id}/quotes?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async setBookStatus({ id, value, type }) {
    const idKey = type === 'books' ? 'book_id' : 'audio_book_id';
    return api.post(`${API_URL}/profile/lists/${type === 'books' ? type : 'audio-books'}`, { [idKey]: id, status: value });
  }

  static async deleteBookFromFavorite({ id, type }) {
    const idKey = type === 'books' ? 'book_id' : 'audio_book_id';
    const bookType = type === 'books' ? type : 'audio-books';
    return api.delete(`${API_URL}/profile/lists/${bookType}?${idKey}=${id}`);
  }

  static async setBookRating({ id, value }) {
    return api.post(`${API_URL}/books/ratings`, { book_id: id, rating: value });
  }

  static async setAudioBookRating({ id, value }) {
    return api.post(`${API_URL}/audio-books/ratings`, { audio_book_id: id, rating: value });
  }

  static async recommendBook(data) {
    return api.post(`${API_URL}/users-recommend`, data);
  }

  static async audioBookChapters(audiobook) {
    return axios.get(`${API_URL}/audio-books/${audiobook}/chapters`);
  }

  static async getUserReadingProgresses(token) {
    return axios.get(`${API_URL}/profile/lists/progresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
