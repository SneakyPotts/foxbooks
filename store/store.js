import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../components/Header/headerSlice';
import bookSlice from '../components/shared/common/book/bookSlice';
import authSlice from "./authSlice";
import homeSlice from "./homeSlice";

export function makeStore() {
	return configureStore({
		reducer: {
			headerSlice,
			bookSlice,
			auth: authSlice,
			home: homeSlice
		},
	});
}

const store = makeStore();

export default store;
