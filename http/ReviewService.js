import axios from "axios";
import { API_URL } from ".";

export default class ReviewService {
	static async getReviewTypes() {
		return axios.get(`${API_URL}/review-types`)
	}
}