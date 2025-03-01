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
				servings: data.servings || 1,
				Ingredients:
					data.list.Ingredients?.map((gi, index) => ({
						id: gi.Ingredient?.id || `temp-${index}`,
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
			const response = await csrfFetch(`/api/lists/generate/${recipeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			const data = await response.json();
			if (!response.ok)
				return rejectWithValue(
					data.error || data || 'Failed to generate list'
				);

			// return data.list;
			return {
				listId: data.list.id,
				list: data.list,
				servings: data.servings,
			};
		} catch (error) {
			return rejectWithValue(error);
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
			return { listId, name };
		} catch (error) {
			console.error('❌ Error updating list name:', error);
			return rejectWithValue(error.message);
		}
	}
);

export const saveIngredient = createAsyncThunk(
	'lists/saveIngredient',
	async ({ listId, ingredientId, quantity }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(
				`/api/lists/${listId}/ingredients/${ingredientId}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ quantity }), // ✅ Only sending quantity update
				}
			);

			const data = await response.json();

			return {
				listId,
				ingredientId,
				quantity: data.groceryItem.quantity, // ✅ Use updated quantity from API
				name: data.groceryItem.Ingredient?.name, // ✅ Keep name from DB (unchanged)
			};
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
		currentList: null,
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
				const { listId, ingredientId, checked } = action.payload;

				if (state.currentList && state.currentList.id === listId) {
					const ingredient = state.currentList.Ingredients.find(
						(ing) => ing.id === ingredientId
					);
					if (ingredient) ingredient.checked = checked;
				}

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
