import axios from "axios";
import { API_URL } from ".";

export default class SitemapService {
  static async getCategories(type) {
    return  await axios.get(`${API_URL}/seo/slugs/genres/${type}`);
  }

  static async getBooksList(bookType, page = 1) {
    return  await axios.get(`${API_URL}/seo/slugs/${bookType}${page && `?page=${page}`}`);
  }

  static async getAuthorsList() {
    return  await axios.get(`${API_URL}/seo/slugs/author`);
  }

  static async getStaticPagesList() {
    return  await axios.get(`${API_URL}/seo/get-static-page`);
  }

  static async getSelectionsList(page = 1) {
    return  await axios.get(`${API_URL}/seo/slugs/selections${page && `?page=${page}`}`);
  }

  static async getSeriesList(page = 1) {
    return  await axios.get(`${API_URL}/authors/series${page && `?page=${page}`}`);
  }
}
