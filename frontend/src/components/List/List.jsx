import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchGroceryList,
	saveListName,
	toggleChecked,
	deleteList,
	fetchAllLists,
	saveIngredient,
} from '../../redux/lists';
import {
	fetchIngredients,
	createIngredient, deleteIngredient,
} from '../../redux/ingredients';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../context/OpenModalButton';
import ConfirmDelete from '../modals/ConfirmDelete';
import { useModal } from '../../context/ModalContext';
import NewIngredient from '../modals/NewIngredient'

export default function List() {
	const { closeModal } = useModal();
	const { listId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const groceryList = useSelector((state) => state.lists.currentList);
	const ingredients = useSelector((state) => state.ingredients.allList);
	const [editingName, setEditingName] = useState(false);
	const [listName, setListName] = useState(groceryList?.name || '');
	const [checkedItems, setCheckedItems] = useState({});
	const existingIngredientIds = new Set(
		groceryList?.Ingredients?.map((item) => item.ingredientId) || []
	);
	const [showAvailableIngredients, setShowAvailableIngredients] =
		useState(false);

	const availableIngredients = ingredients.filter(
		(ingredient) => !existingIngredientIds.has(ingredient.id)
	);
	const toggleAvailableIngredients = () => {
		setShowAvailableIngredients((prev) => !prev);
	};

	useEffect(() => {
		dispatch(fetchGroceryList(listId));
		dispatch(fetchIngredients()); // Fetch available ingredients from DB
	}, [dispatch, listId]);

	useEffect(() => {
		if (groceryList?.name) {
			setListName(groceryList.name);
		}
	}, [groceryList]);

	useEffect(() => {
		if (groceryList?.Ingredients) {
			const initialCheckedState = groceryList.Ingredients.reduce(
				(acc, item) => {
					acc[item.id] = item.checked || false;
					return acc;
				},
				{}
			);
			setCheckedItems(initialCheckedState);
		}
	}, [groceryList]);

	const handleCreateIngredient = async () => {
		const newIngredientName = prompt('Enter new ingredient name:');
		if (!newIngredientName) return;

		dispatch(createIngredient({ name: newIngredientName }))
			.unwrap()
			.then(() => {
				dispatch(fetchIngredients()); // Refresh ingredient list
			})
			.catch((error) =>
				console.error('❌ Error creating ingredient:', error)
			);
	};

	const handleCheck = async (groceryIngredientId) => {
		const newCheckedState = !checkedItems[groceryIngredientId];
		setCheckedItems((prev) => ({
			...prev,
			[groceryIngredientId]: newCheckedState,
		}));

		dispatch(
			toggleChecked({
				listId,
				groceryIngredientId,
				checked: newCheckedState,
			})
		)
			.unwrap()
			.catch((error) => {
				console.error('❌ Error updating checked state:', error);
			});
	};

	// ✅ Handle List Deletion
	const handleDelete = async () => {
		dispatch(deleteList(listId))
			.unwrap()
			.then(() => {
				dispatch(fetchAllLists());
				navigate('/lists');
			})
			.catch((error) => {
				console.error('❌ Error deleting list:', error);
			});
		closeModal();
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;
		const { draggableId, source, destination } = result;
		const draggedIngredientId = parseInt(result.draggableId, 10); // Convert ID to number
		const newIngredient = availableIngredients.find(
			(ing) => ing.id === draggedIngredientId
		);

		if (!newIngredient) return;

		// Optimistically update UI
		const updatedIngredients = [
			...groceryList.Ingredients,
			{
				id: draggedIngredientId,
				name: newIngredient.name,
				quantity: 1, // Default quantity
				measurement: '', // Default measurement
				checked: false,
			},
		];

		dispatch({
			type: 'lists/updateLocalList', // Custom reducer case
			payload: {
				listId,
				ingredients: updatedIngredients,
			},
		});

		// Dispatch Redux thunk to persist in backend
		dispatch(
			saveIngredient({
				listId,
				ingredientId: draggedIngredientId,
				quantity: 1,
				measurement: '',
			})
		)
			.unwrap()
			.then(() => {
				dispatch(fetchGroceryList(listId)); // ✅ Ensure the full list updates correctly
			})
			.catch((error) => console.error('❌ Error adding ingredient:', error));

		if (
			source.droppableId === 'groceryList' &&
			destination.droppableId === 'availableIngredients'
		) {
			console.log(
				`🗑 Removing ingredient ${draggableId} from list ${groceryList.id}`
			);
			dispatch(
				deleteIngredient({
					listId: groceryList.id,
					ingredientId: Number(draggableId),
				})
			);
		}
	};

	if (!groceryList) return <p>Loading grocery list...</p>;

	return (
		<div className='list-container'>
			<button onClick={() => navigate('/lists')} className='back-button'>
				← See My Lists
			</button>

			<p>
				<strong>List Type:</strong>{' '}
				{groceryList.type === 'shopping'
					? 'Shopping List 🛒'
					: 'To-Do List ✅'}
			</p>

			<h1 onClick={() => setEditingName(true)}>
				{editingName ? (
					<input
						type='text'
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						onBlur={() => {
							dispatch(
								saveListName({
									listId,
									name: listName || 'Untitled List',
								})
							);
							setEditingName(false);
						}}
						autoFocus
					/>
				) : (
					listName
				)}
			</h1>

			{groceryList.type === 'shopping' && groceryList.recipeId && (
				<p>
					<strong>Generated from Recipe:</strong>{' '}
					<Link
						to={`/recipes/${groceryList.recipeId}`}
						className='recipe-link'>
						View Recipe 🍽
					</Link>
				</p>
			)}
			{groceryList.type === 'shopping' ? (
				<button
					onClick={toggleAvailableIngredients}
					className='toggle-ingredients-button'>
					{showAvailableIngredients
						? 'Hide Ingredients'
						: 'Show Ingredients to Add'}
				</button>
			) : <p>Add Feature Coming Soon...</p>}

			<DragDropContext onDragEnd={onDragEnd}>
				{groceryList.type === 'shopping' && showAvailableIngredients && (
					<div>
						<Droppable droppableId='ingredients'>
							{(provided) => (
								<div
									className='ingredient-pool'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									<h3>Drag Ingredients to List:</h3>
									<ul>
										{availableIngredients.map((ingredient, i) => (
											<Draggable
												key={ingredient.id}
												draggableId={ingredient.id.toString()}
												index={i}>
												{(provided) => (
													<li
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className='ingredient-item'>
														{ingredient.name}
													</li>
												)}
											</Draggable>
										))}
									</ul>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<OpenModalButton
							buttonText='➕ Add New Ingredient'
							className='create-ingredient-btn'
							modalComponent={<NewIngredient />}
						/>
					</div>
				)}
				{groceryList.type === 'shopping' &&
					<Droppable droppableId='groceryList'>
						{(provided) => (
							<ul
								ref={provided.innerRef}
								{...provided.droppableProps}
								className='grocery-list'>
								<h3>My Grocery List:</h3>
								{groceryList.Ingredients?.map((item, i) => (
									<Draggable
										key={item.id}
										draggableId={item.id.toString()}
										index={i}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}>
												<label>
													<input
														type='checkbox'
														checked={checkedItems[item.id] || false}
														onChange={() => handleCheck(item.id)}
													/>
													<span>{item.name}</span>
												</label>
												<button
													style={{ background: 'none' }}
													onClick={() =>
														dispatch(
															deleteIngredient({
																listId: groceryList.id,
																ingredientId: item.ingredientId,
															})
														)
															.unwrap()
															.then(() => {
																dispatch(fetchGroceryList(listId)); // ✅ Ensure UI updates after delete
															})
															.catch((error) =>
																console.error(
																	'❌ Error deleting ingredient:',
																	error
																)
															)
													}>
													🗑
												</button>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>}
			</DragDropContext>
			<OpenModalButton
				modalComponent={
					<ConfirmDelete onConfirm={handleDelete} itemType='list' />
				}
				buttonText='Delete List'
				className='delete-button'
			/>
		</div>
	);
}
