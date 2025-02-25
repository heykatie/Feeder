import { createBrowserRouter } from 'react-router-dom';
import LoginModal from '../components/Auth/Modals/LoginModal';
// import SignupFormPage from '../components/Auth/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import AboutPet from '../components/Embark/pet/AboutPet';
import Embark from '../components/Embark';
import ChooseSpecies from '../components/Embark/pet/ChooseSpecies';
import StartingChef from '../components/Embark/StartingChef';
import ProtectedRoute from '../context/ProtectedRoute';
import Dash from '../components/Dash';
import Pets from '../components/Dash';

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
				path: 'pick-species',
				element: (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<ChooseSpecies />
					</div>
				),
			},
			{
				path: 'about-pet',
				element: <AboutPet />,
			},
			{
				path: 'customize-souschef',
				element: (
					<div style={{ textAlign: 'center' }}>
						<StartingChef />
					</div>
				),
			},
			{
				path: '/dash',
				element: (
					<ProtectedRoute>
						<Dash />
					</ProtectedRoute>
				),
			},
			{
				path: '/pets',
				element: (
					<ProtectedRoute>
						<Pets />
					</ProtectedRoute>
				),
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
