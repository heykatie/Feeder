import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIngredients } from '../../../redux/ingredients';
import { createRecipe } from '../../../redux/recipes';
import InstructionModal from '../../modals/InstructionModal';
import IngredientModal from '../../modals/IngredientModal';
import OpenModalButton from '../../../context/OpenModalButton';
import Ingredients from '../../Ingredients';
import Instructions from '../../Instructions';
import './NewRecipe.css';

const NewRecipe = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const ingredients = useSelector((state) => state.ingredients.list);
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
	const [instructions, setInstructions] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientQuantities, setIngredientQuantities] = useState({});
	const [errors, setErrors] = useState([]); // ✅ Store errors

	useEffect(() => {
		if (!ingredients.length) dispatch(fetchIngredients());
	}, [dispatch, ingredients.length]);

	const handleCategoryChange = (e) => {
		const value = e.target.value;
		setCategory(value);
		if (value !== 'Other') setCustomCategory('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]); // ✅ Clear errors before submitting

		const finalCategory =
			category === 'Other' ? customCategory.trim() : category;

		// ✅ Basic validation before making the request
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

		const newRecipe = {
			title,
			description,
			imageUrl,
			category: finalCategory,
			difficulty,
			servings,
			prepTime,
			cookTime,
			instructions: JSON.stringify(validInstructions),
			ingredients: selectedIngredients.map((id) => ({
				id,
				quantity: ingredientQuantities[id] || '1 unit',
			})),
		};

		// ✅ Attempt to create a recipe and handle errors from API
		const response = await dispatch(createRecipe(newRecipe));
		if (response?.error) {
			setErrors([response.error]);
			return;
		}

		navigate('/recipes');
	};

	if (!user)
		return <p className='error-message'>Please log in to create a recipe.</p>;

	return (
		<div className='new-recipe-container'>
			<h1 className='form-title'>Create a New Recipe</h1>

			{errors.length > 0 && (
				<div className='error-container'>
					<ul>
						{errors.map((error, index) => (
							<li key={index} className='error-message'>
								{typeof error === 'object' ? error.message : error}{' '}
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

				<div className='recipe-add-btns'>
					<OpenModalButton
						className='add-ingredients-btn'
						buttonText='+ Add Ingredients'
						modalComponent={
							<IngredientModal
								ingredients={ingredients}
								selectedIngredients={selectedIngredients}
								setSelectedIngredients={setSelectedIngredients}
								ingredientQuantities={ingredientQuantities}
								setIngredientQuantities={setIngredientQuantities}
							/>
						}
					/>

					<OpenModalButton
						className='add-step-btn'
						buttonText='+ Add Instructions'
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

				<button type='submit' className='submit-btn'>
					Create Recipe
				</button>
			</form>
		</div>
	);
};

export default NewRecipe;
