import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CreateList.css';
import {
	createList,
	generateGroceryList,
	saveListName,
} from '../../../redux/lists';
import { fetchFavorites, fetchRecipes } from '../../../redux/recipes';
import OpenModalButton from '../../../context/OpenModalButton';
import IngredientModal from '../../modals/IngredientModal/IngredientModal';
import { useModal } from '../../../context/ModalContext';
import { fetchIngredients } from '../../../redux/ingredients';
// import IngredientModal from '../IngredientModal/index';

const CreateListModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const recipes = useSelector((state) => state.recipes.favorites) || [];
	const allIngredients =
		useSelector((state) => state.ingredients.allList) || [];
	const { closeModal } = useModal();

	const [listName, setListName] = useState('');
	const [listType, setListType] = useState('todo'); // Default to shopping list
	const [selectedRecipe, setSelectedRecipe] = useState('');
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientQuantities, setIngredientQuantities] = useState({});
	const [ingredientMeasurements, setIngredientMeasurements] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		dispatch(fetchFavorites());
		dispatch(fetchRecipes());
		dispatch(fetchIngredients());
	}, [dispatch]);

	const handleRecipeChange = (e) => {
		const recipeId = e.target.value;
		setSelectedRecipe(recipeId);

		const selectedRecipeObj = recipes.find((recipe) => recipe.id == recipeId);
		if (selectedRecipeObj) {
			setListName(`Grocery for ${selectedRecipeObj.title}`);
		}
	};

	const handleSaveList = async () => {
		if (!listName.trim()) {
			alert('List name is required.');
			return;
		}

		setIsLoading(true);
		try {
			let newList;
			if (selectedRecipe) {
				const result = await dispatch(
					generateGroceryList(selectedRecipe)
				).unwrap();
				newList = { ...result.list };

				if (
					listName.trim() &&
					listName !== `Grocery for ${result.list.name}`
				) {
					await dispatch(
						saveListName({ listId: newList.id, name: listName })
					);
					newList = { ...newList, name: listName };
				}
			} else {
				const listData = {
					name: listName,
					type: listType,
					userId: user.id,
					ingredients: selectedIngredients.map((id) => ({
						ingredientId: id,
						quantity: ingredientQuantities[id] || 1,
						measurementId: ingredientMeasurements[id] || null,
					})),
				};
				const result = await dispatch(createList(listData)).unwrap();
				newList = { ...result };
			}

			console.log('✅ Created List:', newList);

			if (!newList?.id) {
				throw new Error('New list was not created correctly.');
			}

			closeModal();
			navigate(`/lists/${newList.id}`);
		} catch (error) {
			console.error('❌ Error creating list:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='create-list-modal'>
			<h2>Create a New List</h2>
			<div className='create-list-details'>
				<label>
					List Name:
					<input
						type='text'
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						placeholder='(required)'
						required
					/>
				</label>

				<label>
					List Type:
					<select
						value={listType}
						onChange={(e) => setListType(e.target.value)}>
						<option value='todo'>To-Do</option>
						<option value='shopping'>Shopping</option>
					</select>
				</label>
			</div>

			{listType === 'shopping' && (
				<>
					<h3>{"Add Your Favorite Recipe's Ingredients"}</h3>
					<select value={selectedRecipe} onChange={handleRecipeChange}>
						<option value=''>Select a Recipe (optional)</option>
						{recipes?.length > 0 ? (
							recipes.map((recipe) => (
								<option key={recipe.id} value={recipe.id}>
									{recipe.title}
								</option>
							))
						) : (
							<option disabled>Loading recipes...</option>
						)}
					</select>
				</>
			)}
			<div className='create-list-actions'>
				<button onClick={handleSaveList} disabled={isLoading}>
					{isLoading
						? 'Creating...'
						: listType === 'shopping'
						? 'View List'
						: 'Edit List'}
				</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		</div>
	);
};

export default CreateListModal;

// <OpenModalButton
// 	modalComponent={
// 		<IngredientModal
// 			ingredients={allIngredients}
// 			selectedIngredients={selectedIngredients}
// 			setSelectedIngredients={setSelectedIngredients}
// 			ingredientQuantities={ingredientQuantities}
// 			setIngredientQuantities={setIngredientQuantities}
// 			ingredientMeasurements={ingredientMeasurements}
// 			setIngredientMeasurements={setIngredientMeasurements}
// 			fromCreateList={true}
// 			onBack={closeModal}
// 			handleSaveList={handleSaveList}
// 		/>
// 	}
// 	buttonText='Add Ingredients'
// />;
