import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe, deleteRecipe, toggleFavorite } from '../../redux/recipes';
import { useModal } from '../../context/Modal/ModalContext';
import OpenModalButton from '../../context/OpenModalButton/OpenModalButton';
import ConfirmDelete from '../modals/ConfirmDelete';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { generateGroceryList } from '../../redux/lists';
import IngredientInfo from '../modals/IngredientInfo';
import OpenModal from '../../context/OpenModal';
import './Recipe.css';

const Recipe = () => {
	const { id } = useParams();
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useSelector((state) => state.session.user);
	const recipe = useSelector((state) => state.recipes.selectedRecipe);
	const [isFavorited, setIsFavorited] = useState(false);
	// const [error, setError] = useState({});
	const [servings, setServings] = useState(recipe?.servings || 1);
	const [adjustedIngredients, setAdjustedIngredients] = useState([]);
	const [showNotes, setShowNotes] = useState(false); // Toggle for notes
	const [showInstructions, setShowInstructions] = useState(true);
	const [showIngredients, setShowIngredients] = useState(true);
	const [showNutrition, setShowNutrition] = useState(false);

	useEffect(() => {
		if (recipe) {
			setIsFavorited(recipe.liked);
			setServings(recipe.servings);
		}
	}, [recipe]);

	useEffect(() => {
		if (recipe?.RecipeIngredients && recipe?.Ingredients) {
			const quantityMap = recipe.RecipeIngredients.reduce(
				(acc, recipeIngredient) => {
					const scaledQuantity =
						(recipeIngredient.quantity * servings) / recipe.servings;
					acc[recipeIngredient.ingredientId] = parseFloat(
						scaledQuantity.toFixed(2)
					);
					return acc;
				},
				{}
			);
			setAdjustedIngredients(quantityMap);
		}
	}, [servings, recipe]);

	useEffect(() => {
		dispatch(fetchRecipe(id));
	}, [dispatch, id]);

	const handleFavorite = () => {
		if (!recipe) return;
		dispatch(toggleFavorite(recipe.id));
		setIsFavorited(!isFavorited);
	};

	const handleServingsChange = (e) => {
		setServings(Math.max(1, Number(e.target.value)));
	};

	const handleResetServings = () => {
		setServings(recipe?.servings);
	};

	const handleDelete = async () => {
		await dispatch(deleteRecipe(id));
		closeModal();
		navigate('/recipes');
	};

	const handleGenerateList = async () => {
		if (!recipe) return;
		const result = await dispatch(generateGroceryList(recipe.id));
		if (generateGroceryList.fulfilled.match(result)) {
			navigate(`/lists/${result.payload.listId}`);
		}
	};

	if (!recipe) return <p className='no-recipe'>Recipe not found.</p>;

	// const handleBack = () => {
	// 	const prevPath = location.state?.from || document.referrer;

	// 	if (
	// 		prevPath.includes('/:userId') ||
	// 		prevPath.includes('/favorites') ||
	// 		prevPath.includes('/recipes?search')
	// 	) {
	// 		navigate(-1);
	// 	} else {
	// 		navigate('/recipes');
	// 	}
	// };

	// const handleBack = () => {
	// 	const prevPath = location.state?.from || document.referrer;
	// 	if (
	// 		prevPath?.includes('/edit') ||
	// 		prevPath?.includes('/lists') ||
	// 		prevPath?.includes('/recipes/new')
	// 	) {
	// 		navigate('/recipes');
	// 	} else {
	// 		navigate(-1);
	// 	}
	// };

	const handleBack = () => {
		const prevPath = location.state?.from;
		// console.error('Previous Path:', prevPath);

		if (prevPath?.includes('/edit') || prevPath?.includes('/new')) {
			navigate(`/${user.id}/recipes`);
		} else if (
			prevPath?.includes('?search') ||
			prevPath?.includes('/favorites') ||
			prevPath?.includes('/recipes')
		) {
			navigate(-1);
		} else {
			navigate('/recipes');
		}
	};

	return (
		<div className='recipe-container'>
			<div className='recipe-header'>
				<button className='back-btn' onClick={handleBack}>
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
			</div>

			<h1 className='recipe-title'>{recipe.title}</h1>
			<p className='recipe-description'>{recipe.description}</p>

			<div className='recipe-meta'>
				<p className='recipe-rating'>Rating: {recipe.rating} / 5 ⭐</p>
				<p className='recipe-likes'>❤️ {recipe.likesCount} Likes</p>
			</div>

			<button className='favorite-btn' onClick={handleFavorite}>
				{isFavorited ? (
					<FaHeart className='heart-filled' />
				) : (
					<FaRegHeart className='heart-empty' />
				)}
			</button>

			<img
				src={recipe.imageUrl || '/images/recipes/dogfood.jpeg'}
				alt={recipe.title}
				className='recipe-image'
			/>
			<div className='recipe-info'>
				<p className='recipe-category'>Category: {recipe.category}</p>

				{recipe.totalTime > 0 && (
					<>
						<p className='recipe-time'>
							Prep Time: {recipe.prepTime} min
						</p>
						<p className='recipe-time'>
							Cook Time: {recipe.cookTime} min
						</p>
						<p className='recipe-time'>
							Total Time: {recipe.totalTime} min
						</p>
					</>
				)}

				<p className='recipe-difficulty'>Difficulty: {recipe.difficulty}</p>
			</div>

			<div className='recipe-adjust'>
				<div className='recipe-servings-container'>
					<label className='servings-label'>Servings:</label>
					<input
						type='number'
						min='1'
						value={servings}
						onChange={handleServingsChange}
						className='servings-input'
					/>
					{servings !== recipe?.servings && (
						<button onClick={handleResetServings} className='reset-btn'>
							Reset
						</button>
					)}
				</div>
				<button
					style={{ background: 'none', textDecoration: 'underline' }}
					className='grocery-btn'
					onClick={handleGenerateList}>
					Auto-Generate a Grocery List 🛒
				</button>
			</div>
			<div
				className={`recipe-section collapsible ${
					showIngredients ? 'open' : ''
				}`}>
				<h2 onClick={() => setShowIngredients(!showIngredients)}>
					Ingredients {showIngredients ? '▲' : '▼'}
				</h2>
				<div className='content'>
					<ul className='recipe-ingredients'>
						{recipe.Ingredients.map((ingredient, index) => (
							<>
								<li
									key={`${ingredient.id}-${index}`}
									className='ingredient-item'>
									<span className='ingredient-quantity'>
										{adjustedIngredients[ingredient.id] ||
											ingredient.quantity}
									</span>{' '}
									<span className='ingredient-measurement'>
										{ingredient.measurement ||
											ingredient.abbreviation ||
											''}
									</span>
								</li>
								<OpenModal
									className='ingredient-label'
									itemText={ingredient.name}
									modalComponent={
										<IngredientInfo ingredient={ingredient} />
									}
								/>
							</>
						))}
					</ul>
				</div>
			</div>

			<div
				className={`recipe-section collapsible ${
					showInstructions ? 'open' : ''
				}`}>
				<h2 onClick={() => setShowInstructions(!showInstructions)}>
					Instructions {showInstructions ? '▲' : '▼'}
				</h2>
				<div className='content'>
					<ol className='recipe-instructions'>
						{(Array.isArray(recipe.instructions)
							? recipe.instructions
							: JSON.parse(recipe.instructions)
						).map((step, index) => (
							<li key={`${step}-${index}`}>
								<input type='checkbox' className='step-checkbox' />{' '}
								{index + 1}. {step}
							</li>
						))}
					</ol>
				</div>
			</div>

			<div
				className={`recipe-section collapsible ${
					showNutrition ? 'open' : ''
				}`}>
				<h2 onClick={() => setShowNutrition(!showNutrition)}>
					Nutrition Facts (Per Recipe) {showNutrition ? '▲' : '▼'}
				</h2>
				<div className='content'>
					<ul className='recipe-nutrition'>
						{Object.entries(recipe.nutritionTotals || {}).map(
							([key, value]) => (
								<li key={`${key}-${value}`}>
									{key.charAt(0).toUpperCase() + key.slice(1)}: {value}{' '}
									{key === 'calories' ? 'kcal' : 'g'}
								</li>
							)
						)}
					</ul>
				</div>
			</div>

			{recipe.notes && (
				<div className='recipe-section'>
					<h2
						onClick={() => setShowNotes(!showNotes)}
						className='toggle-notes'>
						Notes {showNotes ? '▲' : '▼'}
					</h2>
					{showNotes && <p className='recipe-notes'>{recipe.notes}</p>}
				</div>
			)}
		</div>
	);
};

export default Recipe;
