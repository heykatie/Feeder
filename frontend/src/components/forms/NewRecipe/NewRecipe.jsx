import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIngredients } from '../../../redux/ingredients';
import { createRecipe } from '../../../redux/recipes';
import InstructionModal from '../../modals/Instructions';
import OpenModalButton from '../../../context/OpenModalButton';
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
	const [difficulty, setDifficulty] = useState('Easy');
	const [servings, setServings] = useState(1);
	const [prepTime, setPrepTime] = useState(0);
	const [cookTime, setCookTime] = useState(0);
	const [instructions, setInstructions] = useState([]);
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientQuantities, setIngredientQuantities] = useState({});

	// Fetch ingredients only if not already loaded
	useEffect(() => {
		if (!ingredients.length) dispatch(fetchIngredients());
	}, [dispatch, ingredients.length]);

	const handleIngredientChange = (ingredientId, checked) => {
		setSelectedIngredients((prev) =>
			checked
				? [...prev, ingredientId]
				: prev.filter((id) => id !== ingredientId)
		);

		setIngredientQuantities((prev) => {
			const updated = { ...prev };
			if (!checked) delete updated[ingredientId];
			return updated;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prevent submitting empty required fields
		if (!title.trim() || !category || !difficulty) {
			alert('Title, Category, and Difficulty are required!');
			return;
		}

		// Filter out empty instruction steps
		const validInstructions = instructions.filter(
			(step) => step.trim() !== ''
		);

		const newRecipe = {
			title,
			description,
			imageUrl,
			category,
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

		const response = await dispatch(createRecipe(newRecipe));
		if (response) navigate('/recipes');
	};

	if (!user)
		return <p className='error-message'>Please log in to create a recipe.</p>;

	return (
		<div className='new-recipe-container'>
			<h1 className='form-title'>Create a New Recipe</h1>
			<form onSubmit={handleSubmit} className='recipe-form'>
				<label className='form-label'>Title:</label>
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

				<label className='form-label'>Image URL:</label>
				<input
					type='text'
					className='form-input'
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
				/>

				<div className='form-row'>
					<div className='form-group'>
						<label className='form-label'>Category:</label>
						<select
							className='form-select'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required>
							<option value='' disabled>
								Select a Category
							</option>
							<option value='Balanced Meal'>Balanced Meal</option>
							<option value='Treats'>Treats</option>
							<option value='Stew'>Stew</option>
							<option value='Training Treats'>Training Treats</option>
							<option value='Frozen Treats'>Frozen Treats</option>
							<option value='Soft Food'>Soft Food</option>
							<option value='Soup & Broth'>Soup & Broth</option>
						</select>
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

				<label className='form-label'>Ingredients:</label>
				{ingredients.map((ingredient) => (
					<div key={ingredient.id} className='ingredient-item'>
						<input
							type='checkbox'
							className='ingredient-checkbox'
							checked={selectedIngredients.includes(ingredient.id)}
							onChange={(e) =>
								handleIngredientChange(ingredient.id, e.target.checked)
							}
						/>
						<label className='ingredient-label'>{ingredient.name}</label>
						<input
							type='text'
							className='form-input ingredient-quantity'
							placeholder='Quantity (e.g., 1 cup)'
							value={ingredientQuantities[ingredient.id] || ''}
							onChange={(e) =>
								setIngredientQuantities({
									...ingredientQuantities,
									[ingredient.id]: e.target.value,
								})
							}
						/>
					</div>
				))}

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

				<button type='submit' className='submit-btn'>
					Create Recipe
				</button>
			</form>
		</div>
	);
};

export default NewRecipe;
