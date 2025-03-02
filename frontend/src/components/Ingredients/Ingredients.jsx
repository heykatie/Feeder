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
				{selectedIngredients.map((ingredient) => {
					const quantity = ingredientQuantities?.[ingredient.id] ?? 'N/A';
					const measurementId =
						ingredientMeasurements?.[ingredient.id] ?? null;

					const measurement = measurementId
						? measurements?.find((m) => m.id === measurementId)
						: null;

					const measurementName =
						measurement?.name || ingredient.measurement || 'Unit';

					return (
						<li key={ingredient.id} className='ingredient-preview-item'>
							<span className='ingredient-quantity'>{quantity}</span>
							<span className='ingredient-measurement'>
								{measurementName}
							</span>
							<span className='ingredient-name'>{ingredient.name}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Ingredients;
