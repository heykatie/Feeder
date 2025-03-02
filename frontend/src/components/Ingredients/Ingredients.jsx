import './Ingredients.css';

const Ingredients = ({
	selectedIngredients,
	ingredientQuantities,
	ingredientMeasurements,
	ingredients,
}) => {
	if (!selectedIngredients.length) return null;

	return (
		<div className='ingredients-preview'>
			<h3>Ingredients Preview</h3>
			<ul>
				{selectedIngredients.map((ingredientId) => {
					const ingredient = ingredients.find(
						(ing) => ing.id === ingredientId
					);
					const quantity = ingredientQuantities[ingredientId] || 'N/A';
					const measurement = ingredientMeasurements[ingredientId];
					return (
						<li key={ingredientId} className='ingredient-preview-item'>
							<span className='ingredient-name'>{ingredient?.name}</span>
							<span className='ingredient-quantity'>{quantity}</span>
							<span className='ingredient-measurement'>
								{measurement}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Ingredients;
