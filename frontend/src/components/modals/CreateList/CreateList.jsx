import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CreateList.css';
import { createList, generateGroceryList } from '../../../redux/lists';
import { fetchFavorites, fetchRecipes } from '../../../redux/recipes';
import OpenModalButton from '../../../context/OpenModalButton';
import IngredientModal from '../../modals/IngredientModal/IngredientModal';
import {useModal} from '../../../context/ModalContext';
import {fetchIngredients} from '../../../redux/ingredients';

const CreateListModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);
	const recipes = useSelector((state) => state.recipes.list) || [];
	const allIngredients = useSelector((state) => state.ingredients.list) || []; // Ensure ingredients exist in Redux
  const { closeModal } = useModal();

	const [listName, setListName] = useState('');
	const [listType, setListType] = useState('shopping'); // Default to shopping list
	const [selectedRecipe, setSelectedRecipe] = useState('');
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientQuantities, setIngredientQuantities] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		dispatch(fetchFavorites());
    dispatch(fetchRecipes());
    dispatch(fetchIngredients())
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
			const listData = {
				name: listName,
				type: listType,
				userId: user.id,
				ingredients: selectedIngredients.map((id) => ({
					ingredientId: id,
					quantity: ingredientQuantities[id] || '1 unit',
				})), // ✅ Include selected ingredients
			};

			if (selectedRecipe) {
				const result = await dispatch(
					generateGroceryList({ recipeId: selectedRecipe, ...listData })
				).unwrap();
				newList = result.list;
			} else {
				const result = await dispatch(createList(listData)).unwrap();
				newList = result.list;
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
					<option value='shopping'>Shopping</option>
					<option value='todo'>To-Do</option>
				</select>
			</label>

			<h3>Import Ingredients From Recipe</h3>
			<select value={selectedRecipe} onChange={handleRecipeChange}>
				<option value=''>Select a recipe (optional)</option>
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

			<h3>Or Add Ingredients Manually</h3>
			<OpenModalButton
				modalComponent={
					<IngredientModal
						ingredients={allIngredients}
						selectedIngredients={selectedIngredients}
						setSelectedIngredients={setSelectedIngredients}
						ingredientQuantities={ingredientQuantities}
						setIngredientQuantities={setIngredientQuantities}
					/>
				}
				buttonText='Add Ingredients Manually'
			/>

			<button onClick={handleSaveList} disabled={isLoading}>
				{isLoading ? 'Creating...' : 'Save List'}
			</button>
			<button onClick={closeModal}>Cancel</button>
		</div>
	);
};

export default CreateListModal;
