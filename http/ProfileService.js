import axios from "axios";
import api, { API_URL } from ".";

export default class ProfileService {
	static async getProfile() {
		return api.get(`${API_URL}/users`)
	}

	static async updateProfile(data) {
		return api.post(`${API_URL}/profile`, data)
	}

	static async resetPassword(data) {
		return api.post(`${API_URL}/password_reset`, data)
	}

	static async setNotificationSettings(data) {
		return api.put(`${API_URL}/notification_settings`,data)
	}

	static async deleteUser() {
		return api.delete(`${API_URL}/users`)
	}
}