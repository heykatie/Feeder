import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';

const loadXP = () => {
	try {
		const savedXP = JSON.parse(localStorage.getItem('xpData'));
		return savedXP ? savedXP : { xp: 0, level: 1, xpToNextLevel: 100 };
	} catch {
		return { xp: 0, level: 1, xpToNextLevel: 100 };
	}
};

const initialState = loadXP();

export const updateXP = createAsyncThunk(
	'xp/updateXP',
	async ({ sousChefId, xp }, { rejectWithValue }) => {
		try {
			const response = await csrfFetch(`/api/souschefs/${sousChefId}/xp`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ xp }),
			});
			if (!response.ok) throw new Error('Failed to update XP');
			const data = await response.json();
			return data.xp; // Return updated XP
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
const xpSlice = createSlice({
	name: 'xp',
	initialState,
	reducers: {
		addXP: (state, action) => {
			state.xp += action.payload;

			// Check for level-up
			if (state.xp >= state.xpToNextLevel) {
				state.level += 1;
				state.xp = state.xp - state.xpToNextLevel;
				state.xpToNextLevel = Math.floor(state.xpToNextLevel * 1.2);
			}

			localStorage.setItem(
				'xpData',
				JSON.stringify({
					xp: state.xp,
					level: state.level,
					xpToNextLevel: state.xpToNextLevel,
				})
			);
		},
		resetXP: (state) => {
			state.xp = 0;
			state.level = 1;
			state.xpToNextLevel = 100;

			localStorage.removeItem('xpData');
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateXP.fulfilled, (state, action) => {
			state.xp = action.payload; // Sync XP from backend
		});
	},
});

export const { addXP, resetXP } = xpSlice.actions;
export default xpSlice.reducer;
