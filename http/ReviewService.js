import axios from "axios";
import api, { API_URL } from ".";

export default class ReviewService {
	static async getReviewTypes() {
		return axios.get(`${API_URL}/review-types`)
	}

	static async addReview(data) {
		return api.post(`${API_URL}/reviews`, data)
	}
}