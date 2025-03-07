import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import App from './App';
import store from './redux';
import { restoreCSRF, csrfFetch } from './redux/csrf';
import * as sessionActions from './redux/session';
import { router } from './router';
import { AudioProvider } from './context/AudioContext';
import './index.css';

const isStrictMode = import.meta.env.VITE_STRICT_MODE === 'true';

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
	isStrictMode ? (
		<React.StrictMode>
			<ReduxProvider store={store}>
				<AudioProvider>
					<RouterProvider router={router} />
				</AudioProvider>
			</ReduxProvider>
		</React.StrictMode>
	) : (
		<ReduxProvider store={store}>
			<AudioProvider>
				<RouterProvider router={router} />
			</AudioProvider>
		</ReduxProvider>
	)
);
