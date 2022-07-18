import axios from "axios";
import { API_URL } from ".";

export default class HomeService {
	static async getHomeData({
		sortBy = 3,
		findByCategory = '',
		alphabetTitleIndex = '',
		alphabetAuthorIndex = '',
		page = 1
	}) {
		return axios.get(`${API_URL}/home?sortBy=${sortBy}
			${findByCategory && `&findByCategory=${findByCategory}`}
			${alphabetTitleIndex && `&alphabetTitleIndex=${alphabetTitleIndex}`}
			${alphabetAuthorIndex && `&alphabetAuthorIndex=${alphabetAuthorIndex}`}
			${page && `&page=${page}`}
		`)
	}
}