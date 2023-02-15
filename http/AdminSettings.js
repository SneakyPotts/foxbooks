import axios from "axios";
import {API_URL} from "./index";

class AdminSettings {
  static async getSortSetting(page_slug) {
    return await axios.get(`${API_URL}/page-orders?page_slug=${page_slug}`);
  }

  static async getPageBanner({page_slug, category_slug = ''}) {
    return await axios.get(`${API_URL}/banners?page_slug=${page_slug}
                                ${category_slug && `&category_slug=${category_slug}`}`);
  }
}

export default AdminSettings;
