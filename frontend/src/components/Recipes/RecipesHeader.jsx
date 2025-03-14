import { useLocation, useParams } from 'react-router-dom';

const RecipesHeader = () => {
	const location = useLocation();
	const { userId } = useParams();

	return (
		<div className='recipes-header'>
			{location.pathname === '/favorites' ? (
				<h1>My Favorite Recipes</h1>
			) : userId ? (
				<h1>My Recipes</h1>
			) : (
				<h1>Explore Recipes</h1>
			)}
		</div>
	);
};

export default RecipesHeader;
