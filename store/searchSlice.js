import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import SearchService from "../http/SearchService";
import {addAuthorToFavorite} from "./authorSlice";

const initialState = {
	data: []
};

export const search = createAsyncThunk(
	'search/search',
	async data => {
		const response = await SearchService.search(data)
		return response.data
	}
)

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		// setSelections: (state, action) => {
		// 	state.searchs = action.payload
		// },
	},
	extraReducers: {
		[search.pending]: state => {
			// state.isLoading = true
		},
		[search.fulfilled]: (state, action) => {
			state.data = action.payload
			// state.isError = false
			// state.isLoading = false
		},
		[search.rejected]: state => {
			// state.isError = true
			// state.isLoading = false
		}
	}
});

export const {  } = searchSlice.actions;

export default searchSlice.reducer;
