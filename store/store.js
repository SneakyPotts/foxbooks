import adminSlice from './adminSlice';
import authSlice from './authSlice';
import authorSlice from './authorSlice';
import bookSlice from './bookSlice';
import commentsSlice from './commentsSlice';
import commonSlice from './commonSlice';
import noveltiesSlice from './noveltiesSlice';
import playerSlice from './playerSlice';
import profileSlice from './profileSlice';
import readerSlice from './readerSlice';
import reviewSlice from './reviewSlice';
import searchSlice from './searchSlice';
import selectionSlice from './selectionSlice';
import { configureStore } from '@reduxjs/toolkit';

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
