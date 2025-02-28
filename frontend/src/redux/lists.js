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

export const toggleChecked = async (listId, ingredientId, checked) => {
console.log('Updating checked status:', { listId, ingredientId });

await csrfFetch(`/api/lists/${listId}/ingredients/${ingredientId}`, {
	method: 'PUT',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ checked }),
});

	// setCheckedItems((prev) => ({
	// 	...prev,
	// 	[ingredientId]: !checked,
	// }));
};

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
      .addCase(fetchGroceryList.fulfilled, (state, action) => {
        const updatedList = action.payload;
        state.allLists = state.allLists.filter((list) => list.id !== updatedList.id);
        state.allLists.push(updatedList);
      })
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
			});
	},
});

export default listsSlice.reducer;