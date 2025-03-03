import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/ModalContext';
import {
	fetchMeasurements,
	fetchIngredients,
} from '../../../redux/ingredients';
import IngredientInfo from '../IngredientInfo';
import OpenModal from '../../../context/OpenModal';
import NewIngredient from '../NewIngredient';
import OpenModalButton from '../../../context/OpenModalButton';
import './IngredientModal.css';

const IngredientModal = ({
	handleSaveIngredients,
	selectedIngredients = [],
	setSelectedIngredients,
	ingredientQuantities,
	setIngredientQuantities,
	ingredientMeasurements,
	setIngredientMeasurements,
	fromCreateList = false,
	onBack,
	handleSaveList,
}) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const measurements =
		useSelector((state) => state.ingredients.measurements) || [];
	const ingredients = useSelector((state) => state.ingredients.allList) || [];

	const [updatedSelectedIngredients, setUpdatedSelectedIngredients] = useState(
		[...selectedIngredients]
	);
	const [updatedIngredientQuantities, setUpdatedIngredientQuantities] =
		useState({ ...ingredientQuantities });
	const [updatedIngredientMeasurements, setUpdatedIngredientMeasurements] =
		useState({ ...ingredientMeasurements });

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchMeasurements());
	}, [dispatch]);

	// const handleIngredientChange = (ingredient, checked) => {
	// 	if (checked) {
	// 		setUpdatedSelectedIngredients((prev) => [...prev, ingredient]);

	// 		setUpdatedIngredientQuantities((prev) => ({
	// 			...prev,
	// 			[ingredient.id]: ingredient.RecipeIngredient?.quantity ?? 1,
	// 		}));

	// 		setUpdatedIngredientMeasurements((prev) => ({
	// 			...prev,
	// 			[ingredient.id]: ingredient.RecipeIngredient?.measurementId ?? null,
	// 		}));
	// 	} else {
	// 		setUpdatedSelectedIngredients((prev) =>
	// 			prev.filter((ing) => ing.id !== ingredient.id)
	// 		);

	// 		setUpdatedIngredientQuantities((prev) => {
	// 			const updated = { ...prev };
	// 			delete updated[ingredient.id];
	// 			return updated;
	// 		});

	// 		setUpdatedIngredientMeasurements((prev) => {
	// 			const updated = { ...prev };
	// 			delete updated[ingredient.id];
	// 			return updated;
	// 		});
	// 	}
	// };

	const handleIngredientChange = (ingredient, checked) => {
		setUpdatedSelectedIngredients((prev) => {
			// Only add if not already selected
			if (checked && !prev.some((ing) => ing.id === ingredient.id)) {
				return [...prev, ingredient];
			}
			if (!checked) {
				return prev.filter((ing) => ing.id !== ingredient.id);
			}
			return prev;
		});

		setUpdatedIngredientQuantities((prev) => ({
			...prev,
			[ingredient.id]:
				prev[ingredient.id] ?? ingredient.RecipeIngredient?.quantity ?? 1,
		}));

		setUpdatedIngredientMeasurements((prev) => ({
			...prev,
			[ingredient.id]:
				prev[ingredient.id] ??
				ingredient.RecipeIngredient?.measurementId ??
				null,
		}));
	};

	// const refreshIngredients = async () => {
	// 	const updatedIngredients = await dispatch(fetchIngredients()).unwrap(); // 🔥 Fetch updated ingredients
	// 	setIngredientList(updatedIngredients); // Update state
	// };

	const handleQuantityChange = (ingredientId, value) => {
		setUpdatedIngredientQuantities({
			...updatedIngredientQuantities,
			[ingredientId]: value ? parseInt(value, 10) : 1,
		});
	};

	const handleMeasurementChange = (ingredientId, value) => {
		setUpdatedIngredientMeasurements({
			...updatedIngredientMeasurements,
			[ingredientId]: Number(value) || null,
		});
	};

	const handleSave = () => {
		setSelectedIngredients([...updatedSelectedIngredients]);
		setIngredientQuantities({ ...updatedIngredientQuantities });
		setIngredientMeasurements({ ...updatedIngredientMeasurements });

		handleSaveIngredients(
			[...updatedSelectedIngredients],
			{ ...updatedIngredientQuantities },
			{ ...updatedIngredientMeasurements }
		);
		// if (fromCreateList) {
		// 	handleSaveList();
		// } else {
		// 	closeModal();
		// }
		closeModal();
	};

	return (
		<div className='ingredient-modal'>
			<h2>
				{fromCreateList ? 'Add Ingredients to List' : 'Select Ingredients'}
			</h2>

			<div className='ingredient-list'>
				{ingredients.map((ingredient) => {
					const isChecked = updatedSelectedIngredients.some(
						(ing) => ing.id === ingredient.id
					);
					return (
						<div key={ingredient.id} className='ingredient-item'>
							<input
								type='checkbox'
								className='ingredient-checkbox'
								checked={isChecked}
								onChange={(e) =>
									handleIngredientChange(ingredient, e.target.checked)
								}
							/>


							{/* <label className='ingredient-label'>
								{ingredient.name}
							</label> */}
							<OpenModal
								className='ingredient-label'
								itemText={ingredient.name}
								parentModal={
									<IngredientModal
										ingredients={ingredients}
										selectedIngredients={selectedIngredients}
										setSelectedIngredients={setSelectedIngredients}
										ingredientQuantities={ingredientQuantities}
										setIngredientQuantities={setIngredientQuantities}
										ingredientMeasurements={ingredientMeasurements}
										setIngredientMeasurements={
											setIngredientMeasurements
										}
										fromCreateList={fromCreateList}
										onBack={onBack}
										handleSaveList={handleSaveList}
									/>
								}
								modalComponent={
									<IngredientInfo ingredient={ingredient} />
								}
							/>

							<input
								type='number'
								className='ingredient-quantity'
								placeholder='Quantity'
								value={updatedIngredientQuantities[ingredient.id] || ''}
								onChange={(e) =>
									handleQuantityChange(ingredient.id, e.target.value)
								}
								min='1'
								// disabled={!isChecked}
								onFocus={() => handleIngredientChange(ingredient, true)}
							/>


							<select
								className='ingredient-measurement'
								value={
									updatedIngredientMeasurements[ingredient.id] || ''
								}
								onChange={(e) =>
									handleMeasurementChange(
										ingredient.id,
										e.target.value
									)
								}
								// disabled={!isChecked}
								onFocus={() =>
									handleIngredientChange(ingredient, true)
								}>
								<option value='' disabled>
									Select Unit
								</option>
								{measurements.map((unit) => (
									<option key={unit.id} value={unit.id}>
										{unit.name}{' '}
										{unit.abbreviation
											? `(${unit.abbreviation})`
											: ''}
									</option>
								))}
							</select>
						</div>
					);
				})}
			</div>


			<div>
				<OpenModalButton
					buttonText='➕ Add New Ingredient'
					className='create-ingredient-btn'
					parentModal={
						<IngredientModal
							handleSaveIngredients={handleSaveIngredients}
							selectedIngredients={selectedIngredients}
							setSelectedIngredients={setSelectedIngredients}
							ingredientQuantities={ingredientQuantities}
							setIngredientQuantities={setIngredientQuantities}
							ingredientMeasurements={ingredientMeasurements}
							setIngredientMeasurements={setIngredientMeasurements}
							fromCreateList={fromCreateList}
							onBack={onBack}
							handleSaveList={handleSaveList}
						/>
					}
					modalComponent={
						<NewIngredient fetchIngredients={fetchIngredients} />
					}
				/>
			</div>


			<div className='ingredient-modal-actions'>
				{fromCreateList ? (
					<>
						<button className='save-btn' onClick={handleSave}>
							Save List
						</button>
						<button className='ingredient-back-btn' onClick={onBack}>
							Back
						</button>
					</>
				) : (
					<>
						<button className='save-btn' onClick={handleSave}>
							Save Ingredients
						</button>
						<button
							className='ingredient-cancel-btn'
							onClick={closeModal}>
							Cancel
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default IngredientModal;
