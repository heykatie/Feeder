import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

export const fetchGroceryList = createAsyncThunk(
	'lists/fetchGroceryList',
	async (listId, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/lists/${listId}`);

			const data = await response.json();
			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to fetch list');

			// return {
			// 	...data.list,
			// 	Ingredients: data.list.Ingredients || [],
			// };
			return {
				...data.list,
				Ingredients:
					data.list.Ingredients?.map((gi, index) => ({
						id: gi.Ingredient?.id || `temp-${index}`,
						quantity: gi.quantity,
						name: gi.Ingredient?.name || 'Mystery Item',
						checked: gi.checked || false,
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
			const response = await csrfFetch(`/api/lists/generate/${recipeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await response.json();
			if (!response.ok)
				return rejectWithValue(data.error || 'Failed to generate list');

			// return data.list;
			return { listId: data.list.id, list: data.list };
		} catch (error) {
			return rejectWithValue(error.message);
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
			console.log('✅ List name updated');
			return { listId, name }; // Return updated data
		} catch (error) {
			console.error('❌ Error updating list name:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const saveIngredient = createAsyncThunk(
	'lists/saveIngredient',
	async ({ listId, ingredientId, name, quantity }, { rejectWithValue }) => {
		try {
			await csrfFetch(`/api/lists/${listId}/ingredients/${ingredientId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, quantity }),
			});
			console.log(`✅ Ingredient ${ingredientId} updated`);
			return { listId, ingredientId, name, quantity };
		} catch (error) {
			console.error('❌ Error updating ingredient:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const toggleChecked = createAsyncThunk(
	'lists/toggleChecked',
	async ({ listId, ingredientId, checked }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(
				`/api/lists/${listId}/ingredients/${ingredientId}`,
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

			return { listId, ingredientId, checked };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const listsSlice = createSlice({
	name: 'lists',
	initialState: {
		allLists: [],
		error: null,
		loading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(generateGroceryList.pending, (state) => {
				state.loading = true;
			})
			.addCase(generateGroceryList.fulfilled, (state, action) => {
				state.loading = false;
				state.allLists.push(action.payload);
			})
			.addCase(generateGroceryList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Failed to generate grocery list';
			})
			.addCase(fetchGroceryList.fulfilled, (state, action) => {
				const updatedList = action.payload;
				const index = state.allLists.findIndex(
					(list) => list.id === updatedList.id
				);

				if (index !== -1) {
					state.allLists[index] = updatedList;
				} else {
					state.allLists.push(updatedList);
				}
			})
			.addCase(toggleChecked.fulfilled, (state, action) => {
				const { listId, ingredientId, checked } = action.payload;
				const list = state.allLists.find((list) => list.id === listId);
				if (list) {
					const ingredient = list.Ingredients.find(
						(ing) => ing.id === ingredientId
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
			});
	},
});

export default listsSlice.reducer;
