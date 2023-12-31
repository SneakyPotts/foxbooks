import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import BookService from '../http/BookService';

const initialState = {
  categories: [],
  infoBlocks: [],
  audioCategories: [],
  dailyHotUpdates: [],
  books: [],
  booksByLetter: {},
  book: {},
  bookQuotes: {},
  booksByAuthor: [],
  audioBooksByAuthor: [],
  audioFlag: false,
  userReadingProgress: [],
};

export const getBooksByAuthor = createAsyncThunk('book/getBooksByAuthor', async ({ id = 0, book_id = 0 }) => {
  const response = await BookService.getBooksByAuthor({ id, book_id });
  return response.data;
});

export const getAudioBooksByAuthor = createAsyncThunk('book/getAudioBooksByAuthor', async ({ id = 0, book_id = 0 }) => {
  const response = await BookService.getAudioBooksByAuthor({ id, book_id });
  return response.data;
});

export const getBooksByLetter = createAsyncThunk('book/getBooksByLetter', async ({ query, letter, type, page }) => {
  const response = await BookService.getBooksByLetter({ letter, type, page });
  return {
    ...response.data.data,
    query,
  };
});

export const setBookStatus = createAsyncThunk('book/setBookStatus', async (data) => {
  const response = await BookService.setBookStatus(data);
  return response?.data?.data[0];
});

export const deleteBookFromFavorite = createAsyncThunk('book/deleteBookFromFavorite', async (data) => {
  const response = await BookService.deleteBookFromFavorite(data);
  return response.data;
});

export const setBookRating = createAsyncThunk('book/setBookRating', async (data) => {
  const response = await BookService.setBookRating(data);
  return response.data.data;
});

export const setAudioBookRating = createAsyncThunk('book/setAudioBookRating', async (data) => {
  const response = await BookService.setAudioBookRating(data);
  return response.data.data;
});

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesInfoBlocks: (state, action) => {
      state.infoBlocks = action.payload;
    },
    setAudioCategories: (state, action) => {
      state.audioCategories = action.payload;
    },
    setDailyHotUpdates: (state, action) => {
      state.dailyHotUpdates = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setBookQuotes: (state, action) => {
      state.bookQuotes = action.payload;
    },
    audioBook: (state, action) => {
      state.audioFlag = action.payload;
    },
    setUserReadingProgress: (state, action) => {
      state.userReadingProgress = action.payload;
    },
  },
  extraReducers: {
    [getBooksByAuthor.fulfilled]: (state, action) => {
      state.booksByAuthor = action.payload?.data?.books;
    },

    [getBooksByLetter.fulfilled]: (state, action) => {
      if (!state.booksByLetter?.query || state.booksByLetter?.query !== action.payload.query) {
        state.booksByLetter = action.payload;
      } else {
        state.booksByLetter.data = [...state.booksByLetter.data, ...action.payload.data];
      }
    },

    [getAudioBooksByAuthor.fulfilled]: (state, action) => {
      state.audioBooksByAuthor = action.payload?.data?.audio_books;
    },

    [setBookRating.fulfilled]: (state, action) => {
      state.book.rate_avg = action.payload?.rate_avg;
      state.book.rates_count = action.payload?.rates_count;
    },

    [setAudioBookRating.fulfilled]: (state, action) => {
      state.book.rate_avg = action.payload?.rate_avg;
      state.book.rates_count = action.payload?.rates_count;
    },

    [setBookStatus.fulfilled]: (state, action) => {
      state.book.book_status = action.payload.status;
    },

    [deleteBookFromFavorite.fulfilled]: (state) => {
      state.book.book_status = 0;
    },
  },
});

export const { setCategories, setCategoriesInfoBlocks, setAudioCategories, setDailyHotUpdates, setBooks, setBook, setBookQuotes, audioBook, setUserReadingProgress } =
  bookSlice.actions;

export default bookSlice.reducer;
