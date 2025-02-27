import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchIngredients } from '../../../redux/ingredients';
import {
	createRecipe,
	fetchRecipe,
	updateRecipe,
} from '../../../redux/recipes';
import InstructionModal from '../../modals/InstructionModal';
import IngredientModal from '../../modals/IngredientModal';
import OpenModalButton from '../../../context/OpenModalButton';
import Ingredients from '../../Ingredients';
import Instructions from '../../Instructions';
import { toast } from 'react-toastify';
import './RecipeForm.css';

const RecipeForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const ingredients = useSelector((state) => state.ingredients.list);
	const recipe = useSelector((state) =>
		state.recipes.list.find((r) => r.id === Number(id))
	);
	const user = useSelector((state) => state.session.user);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [category, setCategory] = useState('');
	const [customCategory, setCustomCategory] = useState('');
	const [difficulty, setDifficulty] = useState('Easy');
	const [servings, setServings] = useState(1);
	const [prepTime, setPrepTime] = useState(0);
	const [cookTime, setCookTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [instructions, setInstructions] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientQuantities, setIngredientQuantities] = useState({});
	const [isPublic, setIsPublic] = useState(true);
	const [notes, setNotes] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (!ingredients.length) dispatch(fetchIngredients());
		if (id && !recipe) dispatch(fetchRecipe(id));
	}, [dispatch, id, recipe, ingredients.length]);

	useEffect(() => {
		if (recipe && recipe.id === Number(id)) {
			setPrepTime(recipe.prepTime || 0);
			setCookTime(recipe.cookTime || 0);
			setTotalTime((recipe.prepTime || 0) + (recipe.cookTime || 0));
		}
	}, [recipe, id]);

	useEffect(() => {
		setTotalTime(prepTime + cookTime);
	}, [prepTime, cookTime]);

	useEffect(() => {
		if (id) {
			dispatch(fetchRecipe(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (recipe && recipe.id === Number(id)) {
			setTitle(recipe.title || '');
			setDescription(recipe.description || '');
			setImageUrl(recipe.imageUrl || '');
			setCategory(recipe.category || '');
			setDifficulty(recipe.difficulty || 'Easy');
			setServings(recipe.servings || 1);
			setPrepTime(recipe.prepTime || 0);
			setCookTime(recipe.cookTime || 0);
			setTotalTime(recipe.totalTime || 0);
			setIsPublic(recipe.isPublic ?? true);
			setNotes(recipe.notes || '');
			setInstructions(
				recipe.instructions ? JSON.parse(recipe.instructions) : []
			);
			setSelectedIngredients(recipe.Ingredients?.map((ing) => ing.id) || []);
			setIngredientQuantities(
				recipe.Ingredients?.reduce((acc, ing) => {
					acc[ing.id] = ing.RecipeIngredient?.quantity || '1 unit';
					return acc;
				}, {}) || {}
			);
		}
	}, [recipe, id]);

	const handleCategoryChange = (e) => {
		const value = e.target.value;
		setCategory(value);
		if (value !== 'Other') setCustomCategory('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		if (!user)
			toast.error('Please log in to create a recipe.', {
				position: 'top-center',
				autoClose: 4500,
				closeOnClick: true,
				closeOnEscape: true,
			});

		const finalCategory =
			category === 'Other' ? customCategory.trim() : category;

		const newErrors = [];
		if (!title.trim()) newErrors.push('Title is required.');
		if (!finalCategory.trim()) newErrors.push('Category is required.');
		if (!difficulty) newErrors.push('Difficulty is required.');
		if (!instructions.length)
			newErrors.push('At least one instruction is required.');
		if (!selectedIngredients.length)
			newErrors.push('At least one ingredient is required.');

		if (newErrors.length) {
			setErrors(newErrors);
			return;
		}

		const validInstructions = instructions.filter(
			(step) => step.trim() !== ''
		);

		const recipeData = {
			userId: user.id,
			title,
			description,
			imageUrl,
			category: finalCategory,
			difficulty,
			servings,
			prepTime,
			cookTime,
			totalTime,
			isPublic,
			notes,
			instructions: JSON.stringify(validInstructions),
			ingredients: selectedIngredients.map((id) => ({
				id,
				quantity: ingredientQuantities[id] || '1 unit',
			})),
		};

		let response;
		if (id) {
			response = await dispatch(updateRecipe({ id, recipeData }));
		} else {
			response = await dispatch(createRecipe(recipeData));
		}

		if (response?.error) {
			setErrors(
				Array.isArray(response.payload)
					? response.payload
					: [response.payload]
			);
		} else {
			navigate('/recipes');
		}
	};

	const handleSaveIngredients = (updatedIngredients, updatedQuantities) => {
		setSelectedIngredients(updatedIngredients);
		setIngredientQuantities(updatedQuantities);

		if (id) {
			dispatch(
				updateRecipe({
					id,
					recipeData: {
						...recipe,
						ingredients: updatedIngredients,
						ingredientQuantities: updatedQuantities,
					},
				})
			);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	return (
		<div className='new-recipe-container'>
			<h1 className='form-title'>
				{id ? 'Edit Recipe' : 'Create a New Recipe'}
			</h1>

			{errors.length > 0 && (
				<div className='error-container'>
					<ul>
						{errors.map((error, index) => (
							<li key={index} className='error-message'>
								{typeof error === 'object' && error.message
									? error.message
									: error}
							</li>
						))}
					</ul>
				</div>
			)}

			<form onSubmit={handleSubmit} className='recipe-form'>
				<label className='form-label'>Title:*</label>
				<input
					type='text'
					className='form-input'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<label className='form-label'>Description:</label>
				<textarea
					className='form-textarea'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<div className='form-row'>
					<div className='form-group'>
						<label className='form-label'>Category:*</label>
						<select
							className='form-select'
							value={category}
							onChange={handleCategoryChange}
							required>
							<option value='' disabled>
								Select a Category
							</option>
							<option value='Balanced Meal'>Balanced Meal</option>
							<option value='Raw Diet (BARF)'>Raw Diet (BARF)</option>
							<option value='Kibble Topper'>Kibble Topper</option>
							<option value='Freeze-Dried & Dehydrated'>
								Freeze-Dried & Dehydrated
							</option>
							<option value='Single Protein Diet'>
								Single Protein Diet
							</option>
							<option value='Limited Ingredient Diet'>
								Limited Ingredient Diet
							</option>
							<option value='Puppy Diet'>Puppy Diet</option>
							<option value='Senior Dog Diet'>Senior Dog Diet</option>
							<option value='Other'>Other</option>
						</select>

						{category === 'Other' && (
							<input
								type='text'
								className='form-input custom-category-input'
								placeholder='Enter custom category'
								value={customCategory}
								onChange={(e) => setCustomCategory(e.target.value)}
								required
							/>
						)}
					</div>

					<div className='form-group'>
						<label className='form-label'>Difficulty:</label>
						<select
							className='form-select'
							value={difficulty}
							onChange={(e) => setDifficulty(e.target.value)}
							required>
							<option value='Easy'>Easy</option>
							<option value='Medium'>Medium</option>
							<option value='Hard'>Hard</option>
						</select>
					</div>
				</div>

				<div className='form-row'>
					<div className='form-group'>
						<label className='form-label'>Prep Time (min):</label>
						<input
							type='number'
							className='form-input'
							value={prepTime}
							onChange={(e) => setPrepTime(Number(e.target.value))}
							min='0'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Cook Time (min):</label>
						<input
							type='number'
							className='form-input'
							value={cookTime}
							onChange={(e) => setCookTime(Number(e.target.value))}
							min='0'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Total Time (min):</label>
						<input
							type='number'
							className='form-input'
							value={totalTime}
							readOnly
						/>
					</div>
				</div>

				<label className='form-label'>Notes:</label>
				<textarea
					className='form-textarea'
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>

				<div
					className='recipe-add-btns'
					onClick={(e) => e.preventDefault()}>
					<OpenModalButton
						className='add-ingredients-btn'
						buttonText={id ? 'Edit Ingredients' : '+ Add Ingredients*'}
						modalComponent={
							<IngredientModal
								ingredients={ingredients}
								selectedIngredients={selectedIngredients}
								setSelectedIngredients={handleSaveIngredients}
								ingredientQuantities={ingredientQuantities}
								setIngredientQuantities={setIngredientQuantities}
							/>
						}
					/>
					<OpenModalButton
						className='add-step-btn'
						buttonText={id ? 'Edit Instructions' : '+ Add Instructions*'}
						modalComponent={
							<InstructionModal
								instructions={instructions}
								setInstructions={setInstructions}
							/>
						}
					/>
				</div>

				{selectedIngredients.length > 0 && (
					<Ingredients
						selectedIngredients={selectedIngredients}
						ingredientQuantities={ingredientQuantities}
						ingredients={ingredients}
					/>
				)}

				{instructions.length > 0 && (
					<Instructions instructions={instructions} />
				)}

				<div className='form-group'>
					<label className='form-label'>Make Recipe Public:</label>
					<input
						type='checkbox'
						checked={isPublic}
						onChange={() => setIsPublic(!isPublic)}
					/>
				</div>
				<div className='form-actions'>
					<button type='submit' className='submit-btn'>
						{id ? 'Update Recipe' : 'Create Recipe'}
					</button>
					<button type='button' className='cancel-btn' onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default RecipeForm;
