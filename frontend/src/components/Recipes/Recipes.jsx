import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../../redux/recipes';
import { Link, useNavigate } from 'react-router-dom';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const recipes = useSelector((state) => state.recipes.list);

	useEffect(() => {
		dispatch(fetchRecipes());
	}, [dispatch]);

	if (!recipes.length) return <p className='no-recipes'>No recipes found.</p>;

	return (
		<div className='recipes-container'>
			<div className='recipes-header'>
				<h1>Recipes</h1>
				<button
					className='create-recipe-btn'
					onClick={() => navigate('/recipes/new')}>
					Create New Recipe
				</button>
			</div>
			<div className='recipes-grid'>
				{recipes.map((recipe) => (
					<Link
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
					</Link>
				))}
			</div>
		</div>
	);
};

export default Recipes;
