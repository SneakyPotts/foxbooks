import { configureStore } from '@reduxjs/toolkit';
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import bookSlice from "./bookSlice";
import selectionSlice from "./selectionSlice";
import readerSlice from "./readerSlice";

export function makeStore() {
	return configureStore({
		reducer: {
			common: commonSlice,
			auth: authSlice,
			profile: profileSlice,
			book: bookSlice,
			selection: selectionSlice,
			reader: readerSlice
		},
	});
}

const store = makeStore();

export default store;
