import { API_URL } from '.';
import axios from 'axios';

export default class NoveltiesService {
  static async getNovelties({ sortBy = 1, type = 'all', page = 1 }) {
    return axios.get(`${API_URL}/novelties?sortBy=${sortBy}&type=${type}&page=${page}`);
  }
}
