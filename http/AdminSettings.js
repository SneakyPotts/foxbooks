import axios from "axios";
import {API_URL} from "./index";

class AdminSettings {
  static async getSortSetting(page_slug) {
    return await axios.get(`${API_URL}/page-orders?page_slug=${page_slug}`);
  }
}

export default AdminSettings;