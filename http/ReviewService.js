import axios from "axios";
import api, { API_URL } from ".";

export default class ReviewService {
	static async getCurrentReviews({type, id, page = 1}) {
		return axios.get(`${API_URL}/${type}/${id}/reviews?page=${page}`)
	}

	static async getReviewTypes() {
		return axios.get(`${API_URL}/review-types`)
	}

	static async addReview(data) {
		return api.post(`${API_URL}/reviews`, data)
	}

	static async getUserReview() {
		return api.get(`${API_URL}/reviews/list`)
	}
}