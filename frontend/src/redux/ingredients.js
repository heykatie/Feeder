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

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: { list: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.list = action.payload
		})
			.addCase(fetchMeasurements.fulfilled, (state, action) => {
				state.measurements = action.payload;
			});
	},
});

export default ingredientsSlice.reducer;
