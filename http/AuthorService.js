import api, { API_URL } from '.';
import axios from 'axios';

export default class AuthorService {
  static async getAuthor(slug, token) {
    return axios.get(`${API_URL}/authors/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getAuthorsByLetter({ letter, page }) {
    return axios.get(`${API_URL}/authors/filter?letter=${encodeURI(letter)}&page=${page}`);
  }

  static async getAuthorSeries({ token, id }) {
    return axios.get(`${API_URL}/authors/series/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getAuthorSeriesBySlug({ token, slug, type = 'books' }) {
    return axios.get(`${API_URL}/authors/series/by-slug/${slug}?type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getAuthorAudioBooks(id) {
    return axios.get(`${API_URL}/authors/${id}/audio-books`);
  }

  static async addAuthorToFavorite(id) {
    return api.post(`${API_URL}/profile/lists/authors`, { author_id: id });
  }

  static async deleteAuthorFromFavorite(id) {
    return api.delete(`${API_URL}/profile/lists/authors?author_id=${id}`, { author_id: id });
  }

  static async getUserAuthors({ letter = '', page = 1 }) {
    return api.get(`${API_URL}/profile/lists/authors?page=${page}${letter && `&letter=${letter}`}`);
  }

  static async getAuthorQuotes(slug, page = 1) {
    return axios.get(`${API_URL}/authors/${slug}/quotes${page && `?page=${page}`}`);
  }

  static async getAuthorReviews(slug, page = 1) {
    return axios.get(`${API_URL}/authors/${slug}/reviews${page && `?page=${page}`}`);
  }

  static async getAuthorInfoBlock(slug) {
    return axios.get(`${API_URL}/author-info-block/${slug}`);
  }
}
