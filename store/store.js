import { configureStore } from '@reduxjs/toolkit';
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import bookSlice from "./bookSlice";
import selectionSlice from "./selectionSlice";
import readerSlice from "./readerSlice";
import authorSlice from "./authorSlice";
import noveltiesSlice from "./noveltiesSlice";
import reviewSlice from "./reviewSlice";
import searchSlice from "./searchSlice";
import commentsSlice from "./commentsSlice";
import playerSlice from "./playerSlice";
import adminSlice from "./adminSlice";

export function makeStore() {
	return configureStore({
		reducer: {
			common: commonSlice,
			auth: authSlice,
			profile: profileSlice,
			book: bookSlice,
			selection: selectionSlice,
			reader: readerSlice,
			author: authorSlice,
			novelties: noveltiesSlice,
			review: reviewSlice,
			search: searchSlice,
			comments: commentsSlice,
			player: playerSlice,
			adminSettings: adminSlice,
		},
	});
}

const store = makeStore();

export default store;
