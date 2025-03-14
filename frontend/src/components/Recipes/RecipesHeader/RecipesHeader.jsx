import { useLocation, useParams, useNavigate } from 'react-router-dom';

const RecipesHeader = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userId } = useParams();

	return (
		<div className='recipes-header'>
			{location.pathname === '/favorites' ? (
				<h1>My Favorite Recipes</h1>
			) : userId ? (
				<h1>My Recipes</h1>
			) : (
				<h1
					onClick={() =>
						location.pathname !== '/recipes' && navigate('/recipes')
					}>
					Explore More
				</h1>
			)}
		</div>
	);
};

export default RecipesHeader;
