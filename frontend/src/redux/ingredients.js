import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await csrfFetch('/api/ingredients');
		return response.json();
	}
);


export const fetchMeasurements = createAsyncThunk(
	'ingredients/fetchMeasurements',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/measurements');
			const data = await response.json();

			if (!response.ok) {
				return rejectWithValue(
					data.error || 'Failed to fetch measurements'
				);
			}

			return data; // Assuming response is an array of measurements
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteIngredient = createAsyncThunk(
	'lists/deleteIngredient',
	async ({ listId, ingredientId }, { rejectWithValue }) => {
		try {
			console.log(
				`🗑 Removing ingredient ${ingredientId} from list ${listId}`
			);

			const response = await csrfFetch(
				`/api/ingredients/${listId}/${ingredientId}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to delete ingredient');
			}

			console.log(
				`✅ Successfully deleted ingredient ${ingredientId} from list ${listId}`
			);

			return { listId, ingredientId };
		} catch (error) {
			console.error('❌ Error in deleteIngredient thunk:', error);
			return rejectWithValue(error.message);
		}
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: {
		allList: [],
		currentIngredients: null,
		error: null,
		loading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.allList = action.payload;
			})
			.addCase(fetchMeasurements.fulfilled, (state, action) => {
				state.measurements = action.payload;
			})
			.addCase(deleteIngredient.fulfilled, (state, action) => {
				const { listId, ingredientId } = action.payload;
				if (state.currentIngredients?.id === listId) {
					state.currentIngredients.ingredients =
						state.currentIngredients.ingredients.filter(
							(ing) => ing.ingredientId !== ingredientId
						);
				}
			})
			.addCase(deleteIngredient.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export default ingredientsSlice.reducer;
