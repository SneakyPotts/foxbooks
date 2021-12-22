import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../components/Header/headerSlice';
import bookSlice from '../components/shared/common/book/bookSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      headerSlice,
      bookSlice,
    },
  });
}

const store = makeStore();

export default store;
