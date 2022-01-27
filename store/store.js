import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../components/Header/headerSlice';
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import bookSlice from "./bookSlice";
import selectionSlice from "./selectionSlice";

export function makeStore() {
	return configureStore({
		reducer: {
			headerSlice,
			auth: authSlice,
			profile: profileSlice,
			book: bookSlice,
			selection: selectionSlice,
		},
	});
}

const store = makeStore();

export default store;
