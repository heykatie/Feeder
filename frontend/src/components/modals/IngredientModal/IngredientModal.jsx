import { useState } from 'react';
import { useModal } from '../../../context/ModalContext';
import './IngredientModal.css';

const IngredientModal = ({
	ingredients,
	selectedIngredients,
	setSelectedIngredients,
	ingredientQuantities,
	setIngredientQuantities,
}) => {
	const { closeModal } = useModal();
	const [updatedSelectedIngredients, setUpdatedSelectedIngredients] = useState(
		[...selectedIngredients]
	);
	const [updatedIngredientQuantities, setUpdatedIngredientQuantities] =
		useState({ ...ingredientQuantities });

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
	};

	const handleQuantityChange = (ingredientId, value) => {
		setUpdatedIngredientQuantities({
			...updatedIngredientQuantities,
			[ingredientId]: value,
		});
	};

	const handleSave = () => {
		setSelectedIngredients(updatedSelectedIngredients);
		setIngredientQuantities(updatedIngredientQuantities);
		closeModal();
	};

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
							type='text'
							className='ingredient-quantity'
							placeholder='Quantity (e.g., 1 cup)'
							value={updatedIngredientQuantities[ingredient.id] || ''}
							onChange={(e) =>
								handleQuantityChange(ingredient.id, e.target.value)
							}
						/>
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
