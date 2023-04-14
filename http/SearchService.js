import { API_URL } from '.';
import axios from 'axios';

export default class SearchService {
  static async search({ search, type }) {
    return axios.get(`${API_URL}/search?search=${encodeURI(search)}&type=${type}`);
  }
}
