import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchRecipes,
	fetchFavorites,
	toggleFavorite,
} from '../../redux/recipes';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const allRecipes = useSelector((state) => state.recipes.allRecipes);
	const faves = useSelector((state) => state.recipes.favorites);
	const [recipes, setRecipes] = useState([]);

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
			setRecipes(allRecipes);
		} else if (location.pathname === '/favorites') {
			setRecipes(faves);
		}
	}, [allRecipes, faves, location.pathname]);

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
					<div key={recipe.id} className='recipe-card'>
						<NavLink to={`/recipes/${recipe.id}`} className='recipe-link'>
							<img
								src={recipe.imageUrl || '/images/recipes/dogfood.jpeg'}
								alt={recipe.title}
								className='recipe-image'
							/>
							<h2>{recipe.title}</h2>
							<p>{recipe.description}</p>
						</NavLink>

						<button
							className='favorite-btn'
							onClick={(e) => {
								e.stopPropagation();
								dispatch(toggleFavorite(recipe.id));
							}}>
							{recipe.liked ? (
								<FaHeart color='red' />
							) : (
								<FaRegHeart color='gray' />
							)}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recipes;
