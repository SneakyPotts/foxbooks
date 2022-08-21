import axios from "axios";
import { API_URL } from ".";

export default class SelectionService {
  static async getCategories(type) {
    return  await axios.get(`${API_URL}/seo/slugs/genres/${type}`);
  }
}
