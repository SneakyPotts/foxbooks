import axios from "axios";
import api, { API_URL } from ".";

export default class SelectionService {
	static async getSelections({
		showType = 'block',
		selectionCategory = '',
		bookType = ''
	}) {
		return axios.get(`${API_URL}/compilations?showType=${showType}
			${selectionCategory && `&selectionCategory=${selectionCategory}`}
			${bookType && `&bookType=${bookType}`}
		`)
	}

	static async getSelectionsById({id}) {
		return axios.get(`${API_URL}/public/compilations/${id}`)
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
}