import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/ModalContext';
import { fetchMeasurements } from '../../../redux/ingredients';
import './IngredientModal.css';

const IngredientModal = ({
	ingredients,
	selectedIngredients,
	setSelectedIngredients,
	ingredientQuantities,
	setIngredientQuantities,
	ingredientMeasurements,
	setIngredientMeasurements,
}) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const measurements =
		useSelector((state) => state.ingredients.measurements) || [];
	const [updatedSelectedIngredients, setUpdatedSelectedIngredients] = useState(
		[...selectedIngredients]
	);
	const [updatedIngredientQuantities, setUpdatedIngredientQuantities] =
		useState({ ...ingredientQuantities });
	const [updatedIngredientMeasurements, setUpdatedIngredientMeasurements] =
		useState(
			ingredientMeasurements || {} // Ensure it's at least an empty object
		);

	const handleIngredientChange = (ingredientId, checked) => {
		setUpdatedSelectedIngredients((prev) =>
			checked
				? [...prev, ingredientId]
				: prev.filter((id) => id !== ingredientId)
		);

		setUpdatedIngredientQuantities((prev) => {
			const updated = { ...prev };
			if (!checked) delete updated[ingredientId];
			return updated;
		});

		setUpdatedIngredientMeasurements((prev) => {
			const updated = { ...prev };
			if (!checked) delete updated[ingredientId];
			return updated;
		});
	};

	const handleQuantityChange = (ingredientId, value) => {
		setUpdatedIngredientQuantities({
			...updatedIngredientQuantities,
			[ingredientId]: value ? parseInt(value, 10) : '',
		});
	};

	const handleMeasurementChange = (ingredientId, value) => {
		setUpdatedIngredientMeasurements({
			...updatedIngredientMeasurements,
			[ingredientId]: Number(value) || null,
		});
	};

	const handleSave = () => {
		setSelectedIngredients(updatedSelectedIngredients);
		setIngredientQuantities(updatedIngredientQuantities);
		setIngredientMeasurements(updatedIngredientMeasurements);
		closeModal();
	};

	useEffect(() => {
		dispatch(fetchMeasurements());
	}, [dispatch]);

	return (
		<div className='ingredient-modal'>
			<h2>Select Ingredients</h2>

			<div className='ingredient-list'>
				{ingredients.map((ingredient) => (
					<div key={ingredient.id} className='ingredient-item'>
						<input
							type='checkbox'
							className='ingredient-checkbox'
							checked={updatedSelectedIngredients.includes(
								ingredient.id
							)}
							onChange={(e) =>
								handleIngredientChange(ingredient.id, e.target.checked)
							}
						/>
						<label className='ingredient-label'>{ingredient.name}</label>

						<input
							type='number'
							className='ingredient-quantity'
							placeholder='Quantity'
							value={updatedIngredientQuantities[ingredient.id] || ''}
							onChange={(e) =>
								handleQuantityChange(ingredient.id, e.target.value)
							}
							min='1'
						/>

						<select
							className='ingredient-measurement'
							value={updatedIngredientMeasurements[ingredient.id] || ''}
							onChange={(e) =>
								handleMeasurementChange(ingredient.id, e.target.value)
							}>
							<option value='' disabled>
								Select Unit
							</option>
							{measurements.map((unit) => (
								<option key={unit.id} value={unit.id}>
									{unit.name}{' '}
									{unit.abbreviation ? `(${unit.abbreviation})` : ''}
								</option>
							))}
						</select>
					</div>
				))}
			</div>

			<div className='ingredient-modal-actions'>
				<button className='save-btn' onClick={handleSave}>
					Save Ingredients
				</button>
				<button className='ingredient-cancel-btn' onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default IngredientModal;
