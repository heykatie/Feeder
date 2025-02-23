import { createBrowserRouter } from 'react-router-dom';
import LoginModal from '../components/Auth/Modals/LoginModal';
// import SignupFormPage from '../components/Auth/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import AboutPet from '../components/Embark/Pet/AboutPet';
import Embark from '../components/Embark';

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
				element: (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<LoginModal />
					</div>
				),
			},
			{
				path: 'embark',
				element: <Embark />,
			},
			{
				path: 'about-pet',
				element: <AboutPet />,
			},
			{
				path: '*',
				element: (
					<h1 style={{ display: 'flex', justifyContent: 'center' }}>
						{' '}
						Feature Coming Soon!{' '}
					</h1>
				),
			},
		],
	},
]);

// element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
