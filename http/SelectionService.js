import api, { API_URL } from '.';
import axios from 'axios';

export default class SelectionService {
  static async getSelections({ token, showType = 'block', selectionCategory = 3, bookType = 'all', page = 1 }) {
    return axios.get(
      `${API_URL}/compilations?showType=${showType}
			${selectionCategory && `&selectionCategory=${selectionCategory}`}
			${bookType && `&bookType=${bookType}`}
			${page && `&page=${page}`}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  static async getSelectionBySlug({ token, slug, sortBy = '0', status = '0', search = '', page = 1 }) {
    return axios.get(`${API_URL}/compilations/${slug}?sortBy=${sortBy}&status=${status}&page=${page}${search && `&findByTitle=${search}`}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async createCompilation(data) {
    return api.post(`${API_URL}/compilations`, data);
  }

  static async editCompilation(data) {
    return api.post(`${API_URL}/compilations/edit`, data);
  }

  static async deleteCompilation(id) {
    return api.delete(`${API_URL}/compilations?id=${id}`);
  }

  static async getUserCompilations({ sortBy = '1', compType = '3', page = 1, letter = '' }) {
    return api.get(`${API_URL}/compilations/user?sortBy=${sortBy}&compType=${compType}&page=${page}${letter && `&letter=${letter}`}`);
  }

  static async addBookToCompilation(data) {
    return api.post(`${API_URL}/compilations/books`, data);
  }

  static async deleteBookFromCompilation(compilation_id, book_id, book_type) {
    return api.delete(`${API_URL}/compilations/books/delete?compilation_id=${compilation_id}&book_id=${book_id}&book_type=${book_type}`);
  }

  static async addCompilationToFavorite(id) {
    return api.post(`${API_URL}/compilations/user/favorite`, { compilation_id: id });
  }

  static async deleteCompilationFromFavorite(id) {
    return api.delete(`${API_URL}/compilations/user/favorite?compilation_id=${id}`);
  }
}
