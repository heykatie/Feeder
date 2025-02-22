import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/Auth/LoginFormPage';
import SignupFormPage from '../components/Auth/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Splash />,
			},
			{
				path: 'login',
				element: <LoginFormPage />,
			},
			{
				path: 'signup',
				element: <SignupFormPage />,
			},
		],
	},
]);
