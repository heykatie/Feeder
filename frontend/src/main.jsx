import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import App from './App';
import './index.css';
import configureStore from './redux';
import { restoreCSRF, csrfFetch } from './redux/csrf';
import * as sessionActions from './redux/session';
import { router } from './router';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// if (process.env.NODE_ENV !== 'production') {
// 	window.store = store;
// }

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			{/* <App /> */}
			<RouterProvider router={router} />
		</ReduxProvider>
	</React.StrictMode>
);
