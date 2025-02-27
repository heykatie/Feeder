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

export const createRecipe = createAsyncThunk(
	'recipes/createRecipe',
	async (recipeData, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/recipes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(recipeData),
			});
			if (!response.ok) throw new Error('Failed to create recipe');
			return response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteRecipe = createAsyncThunk(
	'recipes/deleteRecipe',
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetch(`/api/recipes/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete recipe');
			return id;
		} catch (error) {
			return rejectWithValue(error.message);
		}
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
			})
			.addCase(createRecipe.fulfilled, (state, action) => {
				state.list.push(action.payload);
			})
			.addCase(deleteRecipe.fulfilled, (state, action) => {
				state.list = state.list.filter(
					(recipe) => recipe.id !== action.payload
				);
				state.selectedRecipe = null;
			});
	},
});

export default recipesSlice.reducer;
