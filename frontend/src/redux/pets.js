import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// 🔹 Async Thunk: Create a Pet
export const createPet = createAsyncThunk(
	'pets/create',
	async (petData, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/pets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(petData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data; // ✅ Return created pet data
		} catch (error) {
			return rejectWithValue({
				server: 'Failed to create pet. Please try again.',
			});
		}
	}
);

// 🔹 Async Thunk: Get Pets for Logged-in User
export const getPets = createAsyncThunk(
	'pets/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/pets');
			if (!response.ok) {
				return rejectWithValue('Failed to fetch pets.');
			}
			const data = await response.json();
			return data.pets;
		} catch (error) {
			return rejectWithValue('Failed to fetch pets.');
		}
	}
);

const petsSlice = createSlice({
	name: 'pets',
	initialState: { pets: [], status: 'idle', error: null },
	reducers: {
		setPets: (state, action) => {
			state.pets = action.payload;
		},
		clearPets: (state) => {
			state.pets = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPet.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createPet.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.pets.push(action.payload);
			})
			.addCase(createPet.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getPets.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getPets.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.pets = action.payload;
			})
			.addCase(getPets.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// 🔹 Export Actions & Reducer
export const { setPets, clearPets } = petsSlice.actions;
export default petsSlice.reducer;
