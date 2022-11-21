import api, {API_URL} from "./index";

export default class PlayerService {
	static async setProgress(data) { /*audio_book_id, audio_audiobook_id, current_time*/
		await api.post(`${API_URL}/audio-books/store-progress`, data)
	}
}