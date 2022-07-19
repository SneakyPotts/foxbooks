import axios from "axios";
import { API_URL } from ".";

export default class AuthService {
	static async signUp({ email, password }) {
		return axios.post(`${API_URL}/register`, { email, password })
	}

	static async signIn({ email, password }) {
		return axios.post(`${API_URL}/login`, { email, password })
	}

	static async verifyEmail({ email, token }) {
		return axios.post(`${API_URL}/verify_email`, { email, token })
	}

	static async forgotPassword({email}) {
		return axios.post(`${API_URL}/password_forgot`, {email})
	}

	static async resetForgotPassword({email, token, password, password_confirmation}) {
		return axios.post(`${API_URL}/password_reset`, {email, token, password, password_confirmation})
	}

	static async signInWithSocial({ id, token }) {
		return axios.post(`${API_URL}/auth`, { id, token })
	}
}