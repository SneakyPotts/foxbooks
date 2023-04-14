import api, { API_URL } from '.';
import axios from 'axios';

export default class ReviewService {
  static async getCurrentReviews({ type, id, page = 1 }) {
    return api.get(`${API_URL}/${type}/${id}/reviews?page=${page}`);
  }

  static async getReviewTypes() {
    return axios.get(`${API_URL}/review-types`);
  }

  static async addReview(data) {
    return api.post(`${API_URL}/reviews`, data);
  }

  static async getUserReview({ findByTitle = '' }) {
    return api.get(`${API_URL}/reviews/list${findByTitle && `?findByTitle=${findByTitle}`}`);
  }

  static async updateReview(data) {
    return api.put(`${API_URL}/reviews`, data);
  }

  static async deleteUserReview({ type, id }) {
    return api.delete(`${API_URL}/reviews?id=${id}&type=${type}`);
  }
}
