import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';


export const createSousChef = createAsyncThunk(
	'sousChef/create',
	async (sousChefData, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/souschefs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(sousChefData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data; 
		} catch (error) {
			return rejectWithValue({
				server: 'Failed to create SousChef. Please try again.',
			});
		}
	}
);


export const getSousChef = createAsyncThunk(
	'sousChef/get',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/souschefs');
			if (!response.ok) {
				return rejectWithValue('Failed to fetch SousChef.');
			}
			const data = await response.json();
			return data.sousChef;
		} catch (error) {
			return rejectWithValue('Failed to fetch SousChef.');
		}
	}
);


export const updateSousChef = createAsyncThunk(
	'sousChef/update',
	async ({ sousChefId, sousChefData }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/souschefs/${sousChefId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(sousChefData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue({
				server: 'Failed to update SousChef. Please try again.',
			});
		}
	}
);

const sousChefSlice = createSlice({
	name: 'sousChef',
	initialState: { sousChef: null, status: 'idle', error: null },
	reducers: {
		setSousChef: (state, action) => {
			state.sousChef = action.payload;
		},
		clearSousChef: (state) => {
			state.sousChef = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createSousChef.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createSousChef.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.sousChef = action.payload;
			})
			.addCase(createSousChef.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getSousChef.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSousChef.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.sousChef = action.payload;
			})
			.addCase(getSousChef.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateSousChef.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateSousChef.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.sousChef = action.payload;
			})
			.addCase(updateSousChef.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});


export const { setSousChef, clearSousChef } = sousChefSlice.actions;
export default sousChefSlice.reducer;
