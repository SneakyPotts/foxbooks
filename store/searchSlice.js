import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import SearchService from "../http/SearchService";

const initialState = {
	data: {}
};

export const search = createAsyncThunk(
	'search/search',
	async data => {
		const response = await SearchService.search(data)
		return response.data.data
	}
)

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.data = action.payload
		},
		clearSearch: (state) => {
			state.data = {}
		}
	},
	extraReducers: {
		[search.fulfilled]: (state, action) => {
			state.data = action.payload
		},
		[search.rejected]: state => {
			state.data = {}
		}
	}
});

export const { setSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
