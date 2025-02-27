import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async ({ userId, isLoggedInUser } = {}) => {
		let url = '/api/recipes';

		if (userId) {
			url = isLoggedInUser
				? `/api/recipes/all/${userId}`
				: `/api/recipes/public/${userId}`;
		}

		const response = await fetch(url);
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
			console.log('Sending Recipe Data:', recipeData); // Debugging

			const response = await fetch('/api/recipes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				},
				credentials: 'include',
				body: JSON.stringify(recipeData),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Recipe Creation Failed:', data); // Debugging
				return rejectWithValue(
					data.errors || data.message || 'Failed to create recipe'
				);
			}

			return data;
		} catch (error) {
			console.error('Request Error:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const updateRecipe = createAsyncThunk(
	'recipes/updateRecipe',
	async ({ id, recipeData }, { rejectWithValue }) => {
		try {
			const response = await fetch(`/api/recipes/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				},
				credentials: 'include',
				body: JSON.stringify(recipeData),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Recipe Creation Failed:', data); // Debugging
				return rejectWithValue(
					data.errors || data.message || 'Failed to update recipe'
				);
			}

			return data;
		} catch (error) {
			console.error('Request Error:', error);
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
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				},
				credentials: 'include',
			});

			const data = await response.json();

			if (!response.ok) {
				// Return backend error message if available
				return rejectWithValue(data.error || 'Failed to delete recipe');
			}

			return id;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: { list: [], selectedRecipe: null, error: null },
	reducers: {
		clearRecipeErrors: (state) => {
			state.error = null; // Clear errors when needed
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.list = Array.isArray(action.payload) ? action.payload : [];
				state.error = null; // Reset error on success
			})
			.addCase(fetchRecipe.fulfilled, (state, action) => {
				state.selectedRecipe = action.payload;
				state.error = null;
			})
			.addCase(createRecipe.fulfilled, (state, action) => {
				state.list.push(action.payload);
				state.error = null;
			})
			.addCase(deleteRecipe.fulfilled, (state, action) => {
				state.list = state.list.filter(
					(recipe) => recipe.id !== action.payload
				);
				state.selectedRecipe = null;
				state.error = null; // Clear errors on success
			})
			.addCase(createRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to create recipe';
			})
			.addCase(fetchRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to fetch recipe';
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.error = action.payload || 'Failed to fetch recipes';
				state.list = [];
			})
			.addCase(deleteRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to delete recipe';
			});
	},
});

export const { clearRecipeErrors } = recipesSlice.actions;
export default recipesSlice.reducer;