import { useSelector } from 'react-redux';
import './Ingredients.css';

const Ingredients = ({
	selectedIngredients,
	ingredientQuantities,
	ingredientMeasurements,
	ingredients,
}) => {
	if (!selectedIngredients.length) return null;
		const measurements = useSelector(
			(state) => state.ingredients.measurements
		);

	return (
		<div className='ingredients-preview'>
			<h3>Ingredients Preview</h3>
			<ul>
				{selectedIngredients.map((ingredientId) => {
					const ingredient = ingredients.find(
						(ing) => ing.id === ingredientId
					);
					const quantity = ingredientQuantities[ingredientId] || 'N/A';
					const measurementId = ingredientMeasurements[ingredientId];
					const measurement = measurements.find(
						(m) => m.id === measurementId
					);
					const measurementName = measurement ? measurement.name : 'Unit';
					return (
						<li key={ingredientId} className='ingredient-preview-item'>
							<span className='ingredient-name'>{ingredient?.name}</span>
							<span className='ingredient-quantity'>{quantity}</span>
							<span className='ingredient-measurement'>
								{measurementName}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Ingredients;
