import api, { API_URL } from ".";

export default class ProfileService {
	static async getProfile() {
		return api.get(`${API_URL}/profile`)
	}

	static async updateProfile(data) {
		return api.post(`${API_URL}/profile`, data)
	}

	static async resetPassword(data) {
		return api.post(`${API_URL}/profile/password-change`, data)
	}

	static async setNotificationSettings(data) {
		return api.put(`${API_URL}/notification_settings`,data)
	}

	static async deleteUser() {
		return api.delete(`${API_URL}/profile`)
	}
}
