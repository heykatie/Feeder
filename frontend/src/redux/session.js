import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

// 🔹 Async Thunk: Restore Session User
export const restoreSession = createAsyncThunk(
	'session/restore',
	async (_, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/session');
			if (!response.ok) {
				return rejectWithValue('Failed to restore session.');
			}
			const data = await response.json();
			return data.user || null;
		} catch (error) {
			return rejectWithValue('Failed to restore session.');
		}
	}
);

// 🔹 Async Thunk: Login User
export const login = createAsyncThunk(
	'session/login',
	async ({ credential, password }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch('/api/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ credential, password }),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data.user;
		} catch (error) {
			return rejectWithValue({ server: 'Login failed. Please try again.' });
		}
	}
);

// 🔹 Async Thunk: Logout User
export const logout = createAsyncThunk(
	'session/logout',
	async (_, { rejectWithValue }) => {
		try {
			await csrfFetch('/api/session', { method: 'DELETE' });
			return null; // Clear user state
		} catch (error) {
			return rejectWithValue('Logout failed. Please try again.');
		}
	}
);

// 🔹 Session Slice
const sessionSlice = createSlice({
	name: 'session',
	initialState: { user: null, status: 'idle', error: null },
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(restoreSession.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(restoreSession.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(restoreSession.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'succeeded';
				state.user = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// 🔹 Export Actions & Reducer
export const { setUser, clearUser } = sessionSlice.actions;
export default sessionSlice.reducer;
