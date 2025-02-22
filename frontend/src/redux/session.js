import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const authenticate = () => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/restore-user');
		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return data;
		}
	} catch (e) {
		console.error('Auth Error:', e);
		return null;
	}
};

export const fetchSession = () => async (dispatch) => {
	const res = await csrfFetch('/api/session');
	if (!res.ok) throw new Error('Not authenticated');
	const data = await res.json();
	dispatch(setUser(data.user));
	return res;
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	try {
		const response = await csrfFetch('/api/session', {
			method: 'POST',
			body: JSON.stringify({ credential, password }),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data.user));
			return null;
		}
	} catch (error) {
		if (error.response && error.response.status < 500) {
			const errorMessages = await error.response.json();
			return errorMessages;
		}
		return { server: 'Login went wrong. Please try again.' };
	}
};

export const signup = (user) => async (dispatch) => {
	try {
		const response = await csrfFetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data.user));
			return null;
		}
	} catch (error) {
		if (error.response && error.response.status < 500) {
			const errorMessages = await error.response.json();
			return errorMessages;
		}
		return { server: 'Signup went wrong. Please try again.' };
	}
};

export const logout = () => async (dispatch) => {
	await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(removeUser());
	return true;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		default:
			return state;
	}
};

export default sessionReducer;
