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
			return await response.json();
		} catch (error) {
			if (error?.json) {
				try {
					const err = await error.json();
					return rejectWithValue(
						err || { message: 'Failed to create pet.' }
					);
				} catch (parseError) {
					return rejectWithValue({
						message: 'Failed to parse error response.',
					});
				}
			}
			return rejectWithValue({ message: 'Failed to create pet.' });
		}
	}
);


export const getPets = createAsyncThunk(
	'pets/getAll',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/pets');
			return (await response.json()).pets;
		} catch (error) {
			const err = await error.json();
			return rejectWithValue(err || 'Failed to fetch pets.');
		}
	}
);

export const updatePet = createAsyncThunk(
	'pets/update',
	async ({ id, ...updatedData }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/pets/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData),
			});
			return await response.json();
		} catch (error) {
			const err = await error.json();
			return rejectWithValue(err || 'Failed to update pet.');
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
      return petId;
		} catch (error) {
			const err = await error.json();
      return rejectWithValue(err || 'Failed to delete pet.');
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
		clearErrors: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPet.pending, (state) => {
				state.status = 'loading';
				state.error = null;
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
				state.error = null;
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
				state.error = null;
			})
			.addCase(updatePet.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const index = state.pets.findIndex(
					(pet) => pet.id === action.payload.id
				);
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
				state.error = null;
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
