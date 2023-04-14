import { API_URL } from './index';
import axios from 'axios';

class AdminSettings {
  static async getSortSetting(page_slug) {
    return await axios.get(`${API_URL}/page-orders?page_slug=${page_slug}`);
  }

  static async getPageBanner({ page_slug, category_slug = '' }) {
    return await axios.get(`${API_URL}/banners?page_slug=${page_slug}
                                ${category_slug && `&category_slug=${category_slug}`}`);
  }
}

export default AdminSettings;
