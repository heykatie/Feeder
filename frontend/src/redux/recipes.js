import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async () => {
		const response = await fetch('/api/recipes');
		return response.json();
	}
);

export const fetchRecipe = createAsyncThunk(
	'recipes/fetchRecipe',
	async (id) => {
		const response = await fetch(`/api/recipes/${id}`);
		return response.json();
	}
);

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: { list: [], selectedRecipe: null },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.list = action.payload;
			})
			.addCase(fetchRecipe.fulfilled, (state, action) => {
				state.selectedRecipe = action.payload;
			});
	},
});

export default recipesSlice.reducer;
