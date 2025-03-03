import { useSelector, useDispatch } from 'react-redux';
import {  useEffect } from 'react';
import './Ingredients.css';
import { fetchMeasurements } from '../../redux/ingredients';

const Ingredients = ({
	selectedIngredients,
	ingredientQuantities,
	ingredientMeasurements,
	ingredients,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMeasurements())
	}, [dispatch])


	if (!selectedIngredients.length) return null;
		const measurements = useSelector(
			(state) => state.ingredients.measurements
		);

	return (
		<div className='ingredients-preview'>
			<h3>Ingredients Preview</h3>
			<ul>
				{/* {console.error('katie', selectedIngredients)} */}
				{selectedIngredients.map((ingredient) => {
					const quantity =
						ingredient.RecipeIngredient?.quantity ??
						ingredientQuantities[ingredient.id] ?? 1;

					const measurementId =
						ingredient.RecipeIngredient?.measurementId ??
						ingredientMeasurements[ingredient.id] ?? 1;

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
