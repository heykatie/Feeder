import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe } from '../../redux/recipes';
import './Recipe.css';

const Recipe = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const recipe = useSelector((state) => state.recipes.selectedRecipe);

	useEffect(() => {
		dispatch(fetchRecipe(id));
	}, [dispatch, id]);

	if (!recipe) return <p className='no-recipe'>Recipe not found.</p>;

	return (
		<div className='recipe-container'>
			<button className='back-btn' onClick={() => navigate('/recipes')}>
				← Back to Recipes
			</button>
			<h1 className='recipe-title'>{recipe.title}</h1>
			<img
				src={'/images/recipes/dogfood.jpeg' || recipe.imageUrl}
				alt={recipe.title}
				className='recipe-image'
			/>
			<p className='recipe-category'>Category: {recipe.category}</p>
			<p className='recipe-description'>{recipe.description}</p>
		</div>
	);
};

export default Recipe;
