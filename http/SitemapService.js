import axios from "axios";
import { API_URL } from ".";

export default class SelectionService {
  static async getCategories(type) {
    return  await axios.get(`${API_URL}/seo/slugs/genres/${type}`);
  }

  static async getBooksList(bookType, page = 1) {
    return  await axios.get(`${API_URL}/seo/slugs/${bookType}?page=${page}`);
  }

  static async getAuthorsList() {
    return  await axios.get(`${API_URL}/seo/slugs/author`);
  }
}
