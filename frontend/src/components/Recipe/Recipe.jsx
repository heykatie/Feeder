import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe, deleteRecipe } from '../../redux/recipes';
import { useModal } from '../../context/ModalContext';
import OpenModalButton from '../../context/OpenModalButton/OpenModalButton';
import ConfirmDelete from '../modals/ConfirmDelete';
import { toggleFavorite } from '../../redux/recipes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { generateGroceryList } from '../../redux/lists';
import './Recipe.css';

const Recipe = () => {
	const { id } = useParams();
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const recipe = useSelector((state) => state.recipes.selectedRecipe);
	const [isFavorited, setIsFavorited] = useState(false);
	const [error, setError] = useState({});
	const [servings, setServings] = useState(recipe?.servings || 1);
	const [adjustedIngredients, setAdjustedIngredients] = useState([]);

	// const handleServingsChange = (e) => {
	// 	const newServings = Number(e.target.value);
	// 	setServings(newServings);
	// };

	const handleServingsChange = (e) => {
		const newServings = Math.max(1, Number(e.target.value));
		setServings(newServings);
	};

	const handleResetServings = () => {
		setServings(recipe?.servings);
	};

	useEffect(() => {
		if (recipe) {
			setIsFavorited(recipe.liked);
			setServings(recipe.servings)
		}
	}, [recipe]);

	const handleFavorite = () => {
		if (!recipe) return;
		try {
			dispatch(toggleFavorite(recipe.id));
			setIsFavorited(!isFavorited);
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		if (recipe?.Ingredients) {
			const newIngredients = recipe.Ingredients.map((ingredient) => {
				const scaledQuantity =
					(ingredient.quantity * servings) / recipe.servings;
				return {
					...ingredient,
					scaledQuantity: parseFloat(scaledQuantity.toFixed(2)), // Avoid floating-point issues
				};
			});
			setAdjustedIngredients(newIngredients);
		}
	}, [servings, recipe]);


	useEffect(() => {
		try {
			dispatch(fetchRecipe(id));
		} catch (error) {
			console.error(error);
		}
	}, [dispatch, id]);

	const handleDelete = async () => {
		await dispatch(deleteRecipe(id));
		closeModal();
		navigate('/recipes');
	};

	if (!recipe) return <p className='no-recipe'>Recipe not found.</p>;

	const handleGenerateList = async () => {
		if (!recipe) return;

		const result = await dispatch(generateGroceryList(recipe.id));

		if (result.error) {
			setError(error);
		}

		if (generateGroceryList.fulfilled.match(result)) {
			const listId = result.payload.listId;
			navigate(`/lists/${listId}`);
		}
	};


	return (
		<div className='recipe-container'>
			<button className='back-btn' onClick={() => navigate('/recipes')}>
				← Back to Recipes
			</button>
			{user?.id === recipe.userId && (
				<div className='recipe-actions'>
					<button
						className='edit-btn'
						onClick={() => navigate(`/recipes/${id}/edit`)}>
						Edit Recipe
					</button>
					<OpenModalButton
						buttonText='Delete Recipe'
						className='delete-btn'
						modalComponent={<ConfirmDelete onConfirm={handleDelete} />}
					/>
				</div>
			)}
			<h1 className='recipe-title'>{recipe.title}</h1>{' '}
			<button className='favorite-btn' onClick={handleFavorite}>
				{isFavorited ? (
					<FaHeart color='red' />
				) : (
					<FaRegHeart color='gray' />
				)}
			</button>
			<p className='recipe-likes'>❤️ {recipe.likesCount} Likes</p>
			<p className='recipe-rating'>Rating: {recipe.rating} / 5 ⭐</p>
			<img
				src={'/images/recipes/dogfood.jpeg' || recipe.imageUrl}
				alt={recipe.title}
				className='recipe-image'
			/>
			<p className='recipe-category'>Category: {recipe.category}</p>
			<p className='recipe-difficulty'>Difficulty: {recipe.difficulty}</p>
			<p className='recipe-description'>{recipe.description}</p>
			<div className='recipe-section'>
				<span className='recipe-servings'>
					Servings:
					<input
						type='number'
						min='1'
						value={servings}
						onChange={handleServingsChange}
					/>
				<button onClick={handleResetServings} className='reset-btn'>
					Reset
				</button>
				</span>
				<ul className='recipe-ingredients'>
					<h2>Ingredients</h2>
					{adjustedIngredients.map((ingredient, index) => (
						<li key={index}>
							{ingredient.scaledQuantity}{' '}
							{ingredient.measurement || ingredient.abbreviation || ''}{' '}
							{ingredient.name}
						</li>
					))}
				</ul>
			</div>
			<div className='recipe-section'>
				<p className='recipe-time'>
					Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min |
					Total: {recipe.totalTime} min
				</p>
				<h2>Instructions</h2>
				<ol className='recipe-instructions'>
					{(() => {
						try {
							const steps = Array.isArray(recipe.instructions)
								? recipe.instructions
								: JSON.parse(recipe.instructions);

							return steps.map((step, index) => (
								<li key={index}>{`${index + 1}. ${step}`}</li>
							));
						} catch (error) {
							return <p>Error displaying instructions.</p>;
						}
					})()}
				</ol>
			</div>
			<div className='recipe-section'>
				<h2>Nutrition Facts (Per Recipe)</h2>
				<ul className='recipe-nutrition'>
					<li>Calories: {recipe.nutritionTotals?.calories} kcal</li>
					<li>Carbohydrates: {recipe.nutritionTotals?.carbohydrates} g</li>
					<li>Protein: {recipe.nutritionTotals?.protein} g</li>
					<li>Fats: {recipe.nutritionTotals?.fats} g</li>
					<li>Fiber: {recipe.nutritionTotals?.fiber} g</li>
					<li>Sodium: {recipe.nutritionTotals?.sodium} mg</li>
					<li>Sugar: {recipe.nutritionTotals?.sugar} g</li>
					<li>Calcium: {recipe.nutritionTotals?.calcium} mg</li>
					<li>Iron: {recipe.nutritionTotals?.iron} mg</li>
					<li>Moisture: {recipe.nutritionTotals?.moisture} %</li>
				</ul>
			</div>
			{recipe.notes && (
				<div className='recipe-section'>
					<h2>Notes</h2>
					<p className='recipe-notes'>{recipe.notes}</p>
				</div>
			)}
			<button className='grocery-btn' onClick={handleGenerateList}>
				Generate Grocery List 🛒
			</button>
			{/* {error && error} */}
		</div>
	);
};

export default Recipe;
