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
	// ingredients,
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
		const ingredients =
			useSelector((state) => state.ingredients.allList) || [];
	const [updatedSelectedIngredients, setUpdatedSelectedIngredients] = useState(
		[...selectedIngredients]
	);
	const [updatedIngredientQuantities, setUpdatedIngredientQuantities] =
		useState({ ...ingredientQuantities });
	const [updatedIngredientMeasurements, setUpdatedIngredientMeasurements] =
		useState(ingredientMeasurements || {});

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
	console.log(
		'setSelectedIngredients in IngredientModal:',
		setSelectedIngredients
	);

	// const refreshIngredients = async () => {
	// 	const updatedIngredients = await dispatch(fetchIngredients()).unwrap(); // 🔥 Fetch updated ingredients
	// 	setIngredientList(updatedIngredients); // Update state
	// };

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
		setSelectedIngredients([...updatedSelectedIngredients]);
		setIngredientQuantities({ ...updatedIngredientQuantities });
		setIngredientMeasurements({ ...updatedIngredientMeasurements });

		if (fromCreateList) {
			handleSaveList(); // Calls save list function if from CreateListModal
		} else {
			closeModal();
		}
	};

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchMeasurements());
	}, [dispatch]);

	return (
		<div className='ingredient-modal'>
			<h2>
				{fromCreateList ? 'Add Ingredients to List' : 'Select Ingredients'}
			</h2>

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
						{/* <label className='ingredient-label'>{ingredient.name}</label> */}
						<OpenModal
							className='ingredient-label'
							itemText={ingredient.name}
							parentModal={
								<IngredientModal
									ingredients={ingredients}
									selectedIngredients={selectedIngredients}
									setSelectedIngredients={setSelectedIngredients} // ✅ Ensure this is passed
									ingredientQuantities={ingredientQuantities}
									setIngredientQuantities={setIngredientQuantities}
									ingredientMeasurements={ingredientMeasurements}
									setIngredientMeasurements={setIngredientMeasurements}
									fromCreateList={fromCreateList}
									onBack={onBack}
									handleSaveList={handleSaveList}
								/>
							}
							modalComponent={<IngredientInfo ingredient={ingredient} />}
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
				<div>
					<OpenModalButton
						buttonText='➕ Add New Ingredient'
						className='create-ingredient-btn'
						parentModal={
							<IngredientModal
								ingredients={ingredients}
								selectedIngredients={selectedIngredients}
								setSelectedIngredients={setSelectedIngredients} // ✅ Ensure this is passed
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
