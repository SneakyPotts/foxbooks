import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthorService from '../http/AuthorService';

const initialState = {
  author: [],
  authorsByLetter: {},
  series: {},
  authorReviews: [],
  authorQuotes: [],
};

export const getAuthorsByLetter = createAsyncThunk('author/getAuthorsByLetter', async ({ query, letter, type, page }) => {
  const response = await AuthorService.getAuthorsByLetter({ letter, type, page });
  return {
    ...response.data.data,
    query,
  };
});

export const addAuthorToFavorite = createAsyncThunk('author/addAuthorToFavorite', async (id) => {
  const response = await AuthorService.addAuthorToFavorite(id);
  return response.data;
});

export const deleteAuthorFromFavorite = createAsyncThunk('author/deleteAuthorFromFavorite', async (id) => {
  const response = await AuthorService.deleteAuthorFromFavorite(id);
  return response.data;
});

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setSeries: (state, action) => {
      state.series = action.payload;
    },
    setAuthorReviews: (state, action) => {
      state.authorReviews = action.payload;
    },
    setAuthorQuotes: (state, action) => {
      state.authorQuotes = action.payload;
    },
  },
  extraReducers: {
    [getAuthorsByLetter.fulfilled]: (state, action) => {
      if (!state.authorsByLetter?.query || state.authorsByLetter?.query !== action.payload.query) {
        state.authorsByLetter = action.payload;
      } else {
        state.authorsByLetter.data = [...state.authorsByLetter.data, ...action.payload.data];
      }
    },

    [addAuthorToFavorite.fulfilled]: (state) => {
      state.author.in_favorite = true;
    },

    [deleteAuthorFromFavorite.fulfilled]: (state) => {
      state.author.in_favorite = false;
    },
  },
});

export const { setAuthor, setSeries, setAuthorReviews, setAuthorQuotes } = authorSlice.actions;

export default authorSlice.reducer;
