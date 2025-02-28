import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchFavorites } from '../../redux/recipes';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const recipes = useSelector((state) => state.recipes.list);

	useEffect(() => {
		if (location.pathname === '/recipes') {
			dispatch(fetchRecipes());
		} else if (location.pathname === '/favorites') {
			dispatch(fetchFavorites());
		} else if (userId) {
			const isLoggedInUser = sessionUser?.id == Number(userId);
			dispatch(fetchRecipes({ userId, isLoggedInUser }));
		}
	}, [dispatch, userId, sessionUser, location.pathname]);

	useEffect(() => {
		if (location.pathname === '/recipes') {
			dispatch(fetchRecipes());
		} else if (userId) {
			const isLoggedInUser = sessionUser?.id == Number(userId);
			dispatch(fetchRecipes({ userId, isLoggedInUser }));
		}
	}, [dispatch, userId, sessionUser, location.pathname]);

	if (!recipes.length) return <p className='no-recipes'>No recipes found.</p>;

	return (
		<div className='recipes-container'>
			<div className='recipes-header'>
				{location.pathname === '/favorites' ? (
					<h1>My Favorite Recipes</h1>
				) : userId ? (
					<h1>My Recipes</h1>
				) : (
					<h1>Explore Recipes</h1>
				)}
				<button
					className='create-recipe-btn'
					onClick={() => navigate('/recipes/new')}>
					Create New Recipe
				</button>
			</div>
			<div className='recipes-grid'>
				{recipes.map((recipe) => (
					<NavLink
						key={recipe.id}
						to={`/recipes/${recipe.id}`}
						className='recipe-card'>
						<img
							src={'/images/recipes/dogfood.jpeg' || recipe.imageUrl}
							alt={recipe.title}
							className='recipe-image'
						/>
						<h2>{recipe.title}</h2>
						<p>{recipe.description}</p>
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Recipes;
