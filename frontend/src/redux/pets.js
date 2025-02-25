import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


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
			return data;
		} catch (error) {
			const err = (await error.json() || JSON.stringify(error))
			return rejectWithValue({
				server: err || 'Failed to create pet. Please try again.',
			});
		}
	}
);


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

export const updatePet = createAsyncThunk(
	'pets/update',
	async ({ petId, ...updatedData }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/pets/${petId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue({
				server: 'Failed to update pet. Please try again.',
			});
		}
	}
);


export const deletePet = createAsyncThunk(
	'pets/delete',
	async (petId, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/pets/${petId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			return petId;
		} catch (error) {
			return rejectWithValue({
				server: 'Failed to delete pet. Please try again.',
			});
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
			})
			.addCase(updatePet.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updatePet.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
				if (index !== -1) {
					state.pets[index] = action.payload;
				}
			})
			.addCase(updatePet.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(deletePet.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deletePet.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.pets = state.pets.filter((pet) => pet.id !== action.payload);
			})
			.addCase(deletePet.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});


export default petsSlice.reducer;
