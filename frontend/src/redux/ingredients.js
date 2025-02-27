import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await fetch('/api/ingredients');
		return response.json();
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: { list: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.list = action.payload;
		});
	},
});

export default ingredientsSlice.reducer;
