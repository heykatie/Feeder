import { createBrowserRouter } from 'react-router-dom';
// import LoginModal from '../components/Auth/LoginModal';
import Layout from './Layout';
import Splash from '../components/Splash';
import Embark from '../components/Embark';
// import AboutPet from '../components/Embark/AboutPet';
// import ChooseSpecies from '../components/Embark/ChooseSpecies';
// import StartingChef from '../components/Embark/StartingChef';
import ProtectedRoute from '../context/ProtectedRoute';
import Dash from '../components/Dash';
import Pets from '../components/Pets';
import Recipes from '../components/Recipes';
import Recipe from '../components/Recipe';
import RecipeForm from '../components/forms/RecipeForm';
import List from '../components/List';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Splash />,
			},
			// {
			// 	path: 'login',
			// 	element: (
			// 		<div style={{ display: 'flex', justifyContent: 'center' }}>
			// 			<LoginModal />
			// 		</div>
			// 	),
			// },
			{
				path: 'embark',
				element: <Embark />,
			},
			// {
			// 	path: 'pick-species',
			// 	element: (
			// 		<div style={{ display: 'flex', justifyContent: 'center' }}>
			// 			<ChooseSpecies />
			// 		</div>
			// 	),
			// },
			// {
			// 	path: 'about-pet',
			// 	element: <AboutPet />,
			// },
			// {
			// 	path: 'customize-souschef',
			// 	element: (
			// 		<div style={{ textAlign: 'center' }}>
			// 			<StartingChef />
			// 		</div>
			// 	),
			// },
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
				path: '/recipes',
				element: <Recipes />,
			},
			{
				path: '/recipes/:id',
				element: <Recipe />,
			},
			{
				path: '/recipes/new',
				element: <RecipeForm />,
			},
			{
				path: '/recipes/:id/edit',
				element: (
					<ProtectedRoute>
						<RecipeForm />
					</ProtectedRoute>
				),
			},
			{
				path: '/:userId/recipes',
				element: <Recipes />,
			},
			{
				path: '/favorites',
				element: (
					<ProtectedRoute>
						<Recipes />
					</ProtectedRoute>
				),
			},
			{
				path: '/lists/:listId',
				element: (
					<ProtectedRoute>
						<List />
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
