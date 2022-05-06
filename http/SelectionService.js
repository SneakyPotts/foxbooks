import axios from "axios";
import api, { API_URL } from ".";

export default class SelectionService {
	static async getSelections({
		showType = 'block',
		selectionCategory = 3,
		bookType = 'all'
	}) {
		return axios.get(`${API_URL}/compilations?showType=${showType}
			${selectionCategory && `&selectionCategory=${selectionCategory}`}
			${bookType && `&bookType=${bookType}`}
		`)
	}

	static async getSelectionById({id}) {
		return axios.get(`${API_URL}/compilations/${id}`)
	}

	static async createCompilation(data) {
		return api.post(`${API_URL}/compilations`, data)
	}

	static async getUserCompilations({
		sortBy = '1',
		compType = '3',
		letter = ''
	}) {
		return api.get(`${API_URL}/compilations/user?sortBy=${sortBy}&compType=${compType}${letter && `&letter=${letter}`}`)
	}

	static async addBookToCompilation(data) {
		return api.post(`${API_URL}/compilations/books`, data)
	}

	static async deleteBookFromCompilation(data) {
		return api.delete(`${API_URL}/compilations/books/delete`, data)
	}
}