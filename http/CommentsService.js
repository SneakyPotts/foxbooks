import axios from "axios";
import api, { API_URL } from ".";

export default class CommentsService {
	static async addComments({
		id,
		text,
		type
	}) {
		return api.post(`${API_URL}/comments`,{id:id, text:text, type:type})
	}
}