import axios from "axios";
import {API_URL, API_URL_L} from "./index";

class AdminSettings {
  static async getSortSetting(page_slug, ssr = false) {
    console.log('getSortSetting', `${ssr ? API_URL_L : API_URL}/page-orders?page_slug=${page_slug}`)
    return await axios.get(`${ssr ? API_URL_L : API_URL}/page-orders?page_slug=${page_slug}`);
  }

  static async getPageBanner({page_slug, category_slug = '', ssr = false}) {
    console.log('getPageBanner', `${ssr ? API_URL_L : API_URL}/banners?page_slug=${page_slug}${category_slug && `&category_slug=${category_slug}`}`)
    return await axios.get(`${ssr ? API_URL_L : API_URL}/banners?page_slug=${page_slug}
                                ${category_slug && `&category_slug=${category_slug}`}`);
  }
}

export default AdminSettings;
