import axios from "axios";
import api, { API_URL } from ".";

export default class BookService {
	static async getBooks() {
		return axios.get(`${API_URL}/books?page=2&showType=list&sortBy=1`)
	}

	static async getBookById(id) {
		return axios.get(`${API_URL}/books/${id}`)
	}
}