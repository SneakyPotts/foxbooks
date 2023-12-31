import { API_URL } from '.';
import axios from 'axios';

export default class SitemapService {
  static async getCategories(type) {
    return await axios.get(`${API_URL}/seo/slugs/genres/${type}`);
  }

  static async getBooksList(bookType, page = 1) {
    return await axios.get(`${API_URL}/seo/slugs/${bookType}${page && `?page=${page}`}`);
  }

  static async getAuthorsList(page = 1) {
    return await axios.get(`${API_URL}/seo/slugs/author${page && `?page=${page}`}`);
  }

  static async getStaticPagesList() {
    return await axios.get(`${API_URL}/seo/get-static-page`);
  }

  static async getSelectionsList(page = 1) {
    return await axios.get(`${API_URL}/seo/slugs/compilation${page && `?page=${page}`}`);
  }

  static async getSeriesList({ type, page = 1 }) {
    return await axios.get(`${API_URL}/authors/series?type=${type}${page && `&page=${page}`}`);
  }
}
