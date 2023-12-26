import api, { API_URL } from './index';
import axios from 'axios';
import Cookies from 'js-cookie';

class AdminSettings {
  static async getSortSetting(page_slug) {
    return await axios.get(`${API_URL}/page-orders?page_slug=${page_slug}`);
  }

  static async getPageBanner({ page_slug, category_slug = '' }) {
    return await axios.get(`${API_URL}/banners?page_slug=${page_slug}
                                ${category_slug && `&category_slug=${category_slug}`}`);
  }

  static async getPageContentBanner({ type }) {
    return await axios.get(`${API_URL}/content-banner?type=${type}`);
  }

  static async addView({ id, type }) {
    const requestApi = Cookies.get('token') ? api : axios;

    return await requestApi.post(`${API_URL}/add-view`, { id, type });
  }
}

export default AdminSettings;
