import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
import { setSousChef } from './souschefs';
import { login } from './session';

export const signup = createAsyncThunk(
	'users/signup',
	async (userData, { rejectWithValue, dispatch }) => {
		try {
			const response = await csrfFetch('/api/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();

			dispatch(setUser(data.user));

			if (data.user.sousChef) {
				dispatch(setSousChef(data.user.sousChef));
			}

			await dispatch(
				login({
					credential: userData.email || userData.username,
					password: userData.password,
				})
			);

			return data.user;
		} catch (error) {
			return rejectWithValue({ server: 'Signup failed. Please try again.' });
		}
	}
);

export const updateUser = createAsyncThunk(
	'users/update',
	async ({ userId, userData }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/users/${userId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(userData),
			});
			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}
			const data = await response.json();
			return data.user; // ✅ Updated user data
		} catch (error) {
			return rejectWithValue({ server: 'Update failed. Please try again.' });
		}
	}
);

// 🔹 User Slice
const usersSlice = createSlice({
	name: 'users',
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
			.addCase(signup.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// 🔹 Export Actions & Reducer
export const { setUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
