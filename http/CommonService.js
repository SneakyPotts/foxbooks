import { API_URL } from '.';
import axios from 'axios';

export default class CommonService {
  static async sendSupport(data) {
    return axios.post(`${API_URL}/support`, data);
  }

  static async sendClaim(data) {
    return axios.post(`${API_URL}/claim`, data);
  }

  static async getMyListCounters(token) {
    return axios.get(`${API_URL}/profile/lists/counter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
