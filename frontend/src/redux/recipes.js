import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const fetchRecipes = createAsyncThunk(
	'recipes/fetchRecipes',
	async ({ userId, isLoggedInUser } = {}) => {
		let url = '/api/recipes';

		if (userId) {
			url = isLoggedInUser
				? `/api/recipes/all/${userId}`
				: `/api/recipes/public/${userId}`;
		}

		const response = await csrfFetch(url);
		return response.json();
	}
);

export const fetchFavorites = createAsyncThunk(
	'recipes/fetchFavorites',
	async (_, { getState, rejectWithValue }) => {
		try {
			const userId = getState().session.user?.id;
			if (!userId) return rejectWithValue('User not logged in');

			const response = await csrfFetch(`/api/recipes/favorites/${userId}`);
			const data = await response.json();

			if (!response.ok)
				return rejectWithValue(data || 'Error fetching favorites');
			return data.favorites;
		} catch (error) {
			const err = await error.json();
			return rejectWithValue(err.error || err);
		}
	}
);

export const fetchRecipe = createAsyncThunk(
	'recipes/fetchRecipe',
	async (id, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/recipes/${id}`);
			const data = await response.json();

			const ingredientsWithDetails = data.Ingredients.map((ingredient) => {
				const recipeIngredient = data.RecipeIngredients.find(
					(ri) => ri.ingredientId === ingredient.id
				);

				return {
					...ingredient, // ✅ Now includes full details
					quantity: recipeIngredient?.quantity || 1,
					measurement: recipeIngredient?.Measurement?.name || '',
					abbreviation: recipeIngredient?.Measurement?.abbreviation || '',
				};
			});

			return { ...data, Ingredients: ingredientsWithDetails };
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

// export const fetchRecipe = createAsyncThunk(
// 	'recipes/fetchRecipe',
// 	async (id, { rejectWithValue }) => {
// 		try {
// 			const response = await csrfFetch(`/api/recipes/${id}`);
// 			return response.json();
// 		} catch (error) {
// 			const err = await error.json();
// 			// console.error('katie', err);
// 			return rejectWithValue(err.error || err);
// 		}
// 	}
// );

// export const fetchRecipe = createAsyncThunk(
// 	'recipes/fetchRecipe',
// 	async (id) => {
// 		const response = await csrfFetch(`/api/recipes/${id}`);
// 		const data = await response.json();

// 		// ✅ Ensure ingredients include measurement details
// 		const formattedRecipe = {
// 			...data,
// 			Ingredients: data.Ingredients.map((ingredient) => ({
// 				...ingredient,
// 				quantity: ingredient.quantity,
// 				measurement: ingredient.measurement || '',
// 				abbreviation: ingredient.abbreviation || '',
// 			})),
// 		};

// 		return formattedRecipe;
// 	}
// );

export const createRecipe = createAsyncThunk(
	'recipes/createRecipe',
	async (recipeData, { rejectWithValue }) => {
		try {
			// console.log('Sending Recipe Data:', recipeData);

			const response = await csrfFetch('/api/recipes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('token')}`,
					// 'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				},
				body: JSON.stringify(recipeData),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Recipe Creation Failed:', data);
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
			const response = await csrfFetch(`/api/recipes/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('token')}`,
					// 'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				},
				body: JSON.stringify(recipeData),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Recipe Creation Failed:', data);
				return rejectWithValue(
					data.errors || data.message || 'Failed to update recipe'
				);
			}

			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const toggleFavorite = createAsyncThunk(
	'recipes/toggleFavorite',
	async (recipeId, { getState, rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/recipes/${recipeId}/favorite`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await response.json();
			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to favorite');

			return { recipeId, liked: data.liked };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteRecipe = createAsyncThunk(
	'recipes/deleteRecipe',
	async (id, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/recipes/${id}`, {
				method: 'DELETE',
				// headers: {
				// Authorization: `Bearer ${localStorage.getItem('token')}`,
				// 'X-CSRF-Token': document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1],
				// },
			});

			const data = await response.json();

			if (!response.ok) {
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
	initialState: { allRecipes: [], favorites: [], selectedRecipe: null, error: null },
	reducers: {
		clearRecipeErrors: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// .addCase(fetchRecipes.fulfilled, (state, action) => {
			// 	state.allRecipes = Array.isArray(action.payload) ? action.payload : [];
			// 	state.error = null;
			// })
			.addCase(fetchRecipes.fulfilled, (state, action) => {
				state.allRecipes = Array.isArray(action.payload)
					? action.payload.map((recipe) => ({
							...recipe,
							liked: recipe.liked || false,
					}))
					: [];
				state.error = null;
			})
			.addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload;
			})
			.addCase(fetchRecipe.fulfilled, (state, action) => {
				state.selectedRecipe = {
					...action.payload,
					Ingredients: action.payload.Ingredients.map((ingredient) => ({
						...ingredient,
						measurementId: ingredient.measurementId || null,
						measurement: ingredient.measurement || '',
						abbreviation: ingredient.abbreviation || '',
					})),
				};
				state.error = null;
			})
			.addCase(createRecipe.fulfilled, (state, action) => {
				state.allRecipes.push(action.payload);
				state.error = null;
			})
			.addCase(toggleFavorite.fulfilled, (state, action) => {
				const { recipeId, liked } = action.payload;

				if (window.location.pathname === '/favorites') {
					if (!liked) {
						state.allRecipes = state.allRecipes.filter(
							(recipe) => recipe.id !== recipeId
						);
					}
				} else {
					const updateRecipe = (recipe) => {
						if (recipe) {
							recipe.liked = liked;
							recipe.likesCount = liked
								? recipe.likesCount + 1
								: Math.max(0, recipe.likesCount - 1);
						}
					};

					updateRecipe(state.allRecipes.find((r) => r.id === recipeId));
					updateRecipe(state.selectedRecipe);
				}
			})
			.addCase(deleteRecipe.fulfilled, (state, action) => {
				state.allRecipes = state.allRecipes.filter(
					(recipe) => recipe.id !== action.payload
				);
				state.selectedRecipe = null;
				state.error = null;
			})
			.addCase(createRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to create recipe';
			})
			.addCase(fetchRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to fetch recipe';
			})
			.addCase(fetchFavorites.rejected, (state, action) => {
				state.error = action.payload || 'Failed to fetch favorites';
			})
			.addCase(fetchRecipes.rejected, (state, action) => {
				state.error = action.payload || 'Failed to fetch recipes';
				state.allRecipes = [];
			})
			.addCase(toggleFavorite.rejected, (state, action) => {
				state.error = action.payload || 'Failed to favorite recipe';
			})
			.addCase(deleteRecipe.rejected, (state, action) => {
				state.error = action.payload || 'Failed to delete recipe';
			});
	},
});

export const { clearRecipeErrors } = recipesSlice.actions;
export default recipesSlice.reducer;
