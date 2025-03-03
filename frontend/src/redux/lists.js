import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { toast } from 'react-toastify';

export const createList = createAsyncThunk(
	'lists/createList',
	async ({ name, type }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/lists', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, type }),
			});

			const data = await response.json();
			// console.log('API Response:', data);

			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to create list');

			if (!data.list || !data.list.id) {
				throw new Error('Invalid list returned from API');
			}

			return data.list;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchAllLists = createAsyncThunk(
	'lists/fetchAllLists',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/lists');
			const data = await response.json();

			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to fetch lists');

			return data.lists;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchGroceryList = createAsyncThunk(
	'lists/fetchGroceryList',
	async (listId, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/lists/${listId}`);
			const data = await response.json();

			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to fetch list');

			return {
				...data.list,
				servings: data.servings || 1,
				Ingredients:
					data.list.Ingredients?.map((gi) => ({
						id: gi.id,
						ingredientId: gi.ingredientId,
						quantity: gi.quantity,
						name: gi.name || 'Mystery Item',
						checked: gi.checked || false,
						measurement: gi.measurement || '',
						abbreviation: gi.abbreviation || '',
					})) || [],
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const generateGroceryList = createAsyncThunk(
	'lists/generateGroceryList',
	async (recipeId, { rejectWithValue }) => {
		try {
			if (!recipeId) throw new Error('Missing recipeId');

			const response = await csrfFetch(`/api/lists/generate/${recipeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await response.json();

			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to generate list');

			return {
				listId: data.list.id,
				list: data.list,
				servings: data.servings,
			};
		} catch (error) {
			if (error.status === 401) {
				toast.error('You need to log in to access this feature.', {
					position: 'top-center',
					autoClose: 4000,
					closeOnClick: true,
					closeOnEscape: true,
				});
				return rejectWithValue('Unauthorized');
			}
			// console.error('  generateGroceryList error:', error);
			return rejectWithValue(error.message || 'Internal server error');
		}
	}
);

export const saveListName = createAsyncThunk(
	'lists/saveListName',
	async ({ listId, name }, { rejectWithValue }) => {
		try {
			await csrfFetch(`/api/lists/${listId}/update-name`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name }),
			});
			// console.log('  List name updated');
			return { listId, name };
		} catch (error) {
			console.error('  Error updating list name:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const saveIngredient = createAsyncThunk(
	'lists/saveIngredient',
	async (
		{ listId, ingredientId, quantity, measurement },
		{ rejectWithValue }
	) => {
		try {
			if (!listId) throw new Error('  Missing listId in saveIngredient');
			if (!ingredientId)
				throw new Error('  Missing ingredientId in saveIngredient');

			// console.log(
			// 	`🛠 Adding ingredient: listId=${listId}, ingredientId=${ingredientId}`
			// );

			const response = await csrfFetch(`/api/lists/${listId}/ingredients`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ingredientId, quantity, measurement }),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || 'Failed to save ingredient');
			}

			return {
				listId,
				ingredientId,
				quantity: data.ingredient.quantity,
				measurement: data.ingredient.measurement,
				name: data.ingredient.Ingredient?.name,
			};
		} catch (error) {
			console.error('  Error in saveIngredient thunk:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const toggleChecked = createAsyncThunk(
	'lists/toggleChecked',
	async ({ listId, groceryIngredientId, checked }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(
				`/api/lists/${listId}/grocery-ingredients/${groceryIngredientId}/toggle`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ checked }),
				}
			);

			const data = await response.json();
			if (!response.ok)
				return rejectWithValue(
					data.error || 'Failed to toggle check state'
				);

			return { listId, groceryIngredientId, checked };
		} catch (error) {
			return rejectWithValue(error.message || 'Internal server error');
		}
	}
);

export const deleteList = createAsyncThunk(
	'lists/deleteList',
	async (listId, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/lists/${listId}`, {
				method: 'DELETE',
			});

			if (!response.ok) return rejectWithValue('Failed to delete list');

			return listId; // Return the deleted list ID
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteIngredient = createAsyncThunk(
	'lists/deleteIngredient',
	async ({ listId, ingredientId }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(
				`/api/lists/${listId}/${ingredientId}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to delete ingredient');
			}

			return { listId, ingredientId };
		} catch (error) {
			console.error('  Error in deleteIngredient thunk:', error);
			if (error.json) {
				const err = await error.json();
				return rejectWithValue(err);
			} else {
				return rejectWithValue(error);
			}
		}
	}
);

const listsSlice = createSlice({
	name: 'lists',
	initialState: {
		allLists: [],
		currentList: null,
		error: null,
		loading: false,
	},
	reducers: {
		updateLocalList: (state, action) => {
			const { listId, ingredients } = action.payload;
			if (state.currentList && state.currentList.id === listId) {
				state.currentList.Ingredients = ingredients;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createList.fulfilled, (state, action) => {
				state.loading = false;
				state.allLists.push(action.payload);
			})
			.addCase(fetchAllLists.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAllLists.fulfilled, (state, action) => {
				state.loading = false;
				state.allLists = action.payload;
			})
			.addCase(fetchAllLists.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to fetch lists';
			})
			.addCase(generateGroceryList.pending, (state) => {
				state.loading = true;
			})
			.addCase(generateGroceryList.fulfilled, (state, action) => {
				state.loading = false;
				state.allLists.push(action.payload);
				state.currentList = action.payload;
			})
			.addCase(generateGroceryList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to generate grocery list';
			})
			.addCase(fetchGroceryList.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchGroceryList.fulfilled, (state, action) => {
				state.loading = false;
				const updatedList = action.payload;

				state.currentList = updatedList;

				const index = state.allLists.findIndex(
					(list) => list.id === updatedList.id
				);
				if (index !== -1) {
					state.allLists[index] = updatedList;
				} else {
					state.allLists.push(updatedList);
				}
			})
			.addCase(fetchGroceryList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// .addCase(toggleChecked.fulfilled, (state, action) => {
			// 	const { listId, ingredientId, checked } = action.payload;
			// 	const list = state.allLists.find((list) => list.id === listId);
			// 	if (list) {
			// 		const ingredient = list.Ingredients.find(
			// 			(ing) => ing.id === ingredientId
			// 		);
			// 		if (ingredient) ingredient.checked = checked;
			// 	}
			// })
			.addCase(toggleChecked.fulfilled, (state, action) => {
				const { listId, groceryIngredientId, checked } = action.payload;

				if (state.currentList && state.currentList.id === listId) {
					const ingredient = state.currentList.Ingredients.find(
						(ing) => ing.id === groceryIngredientId
					);
					if (ingredient) ingredient.checked = checked;
				}

				const list = state.allLists.find((list) => list.id === listId);
				if (list) {
					const ingredient = list.Ingredients.find(
						(ing) => ing.id === groceryIngredientId
					);
					if (ingredient) ingredient.checked = checked;
				}
			})
			.addCase(saveListName.fulfilled, (state, action) => {
				const { listId, name } = action.payload;
				const list = state.allLists.find((list) => list.id === listId);
				if (list) list.name = name;
			})
			.addCase(saveIngredient.fulfilled, (state, action) => {
				const { listId, ingredientId, name, quantity } = action.payload;
				const list = state.allLists.find((list) => list.id === listId);
				if (list) {
					const ingredient = list.Ingredients.find(
						(ing) => ing.id === ingredientId
					);
					if (ingredient) {
						ingredient.name = name;
						ingredient.quantity = quantity;
					}
				}
			})
			.addCase(deleteList.fulfilled, (state, action) => {
				state.allLists = state.allLists.filter(
					(list) => list.id !== action.payload
				);
				if (state.currentList?.id === action.payload) {
					state.currentList = null;
				}
			})
			.addCase(deleteIngredient.fulfilled, (state, action) => {
				const { listId, ingredientId } = action.payload;

				// ✅ Ensure `currentList` updates immediately
				if (state.currentList?.id === listId) {
					state.currentList.Ingredients =
						state.currentList.Ingredients.filter(
							(ing) => ing.ingredientId !== ingredientId // ✅ Ensure correct property name
						);
				}

				// ✅ Ensure `allLists` updates immediately
				state.allLists = state.allLists.map((list) =>
					list.id === listId
						? {
								...list,
								Ingredients: list.Ingredients.filter(
									(ing) => ing.ingredientId !== ingredientId
								),
						}
						: list
				);
			})
			.addCase(deleteIngredient.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default listsSlice.reducer;
