import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import usersReducer from './users';
import {thunk} from 'redux-thunk';

const isProduction = import.meta.env.MODE === 'production';

import logger from 'redux-logger';

const store = configureStore({
	reducer: {
		session: sessionReducer,
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		isProduction
			? getDefaultMiddleware().concat(thunk)
			: getDefaultMiddleware().concat(thunk, logger),
	devTools: !isProduction,
});

export default store;
