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
				try {
					const errorData = await response.json();
					return rejectWithValue(errorData);
				} catch (parseError) {
					return rejectWithValue({
						message: response || 'Failed to parse error response.',
					});
				}
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
			if (error?.json) {
				try {
					const err = await error.json();
					return rejectWithValue(
						err || { message: 'Signup failed1. Please try again.' }
					);
				} catch (parseError) {
					return rejectWithValue({
						message: error || 'Failed to parse error response.',
					});
				}
			}
			return rejectWithValue({ message: 'Signup failed2. Please try again.' });
		}
	}
);

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
	try {
		const response = await csrfFetch('/api/users');
		if (!response.ok) {
			throw new Error('Failed to fetch user');
		}
		return await response.json();
	} catch (error) {
		return Promise.reject(error.message);
	}
});

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
			return data.user;
		} catch (error) {
			return rejectWithValue({ message: 'Update failed. Please try again.' });
		}
	}
);

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
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.error = null;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.error = action.payload || 'An error occurred';
			});
	},
});

export const { setUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
