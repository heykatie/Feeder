import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './users';
import petsReducer from './pets';
import sousChefsReducer from './souschefs';
import recipesReducer from './recipes';
import ingredientsReducer from './ingredients'
import listsReducer from './lists'

const isProduction = import.meta.env.MODE === 'production';

import logger from 'redux-logger';

const store = configureStore({
	reducer: {
		session: sessionReducer,
		users: usersReducer,
		pets: petsReducer,
		sousChefs: sousChefsReducer,
		recipes: recipesReducer,
		ingredients: ingredientsReducer,
		lists: listsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		isProduction
			? getDefaultMiddleware().concat(thunk)
			: getDefaultMiddleware().concat(thunk, logger),
	devTools: !isProduction,
});

export default store;
