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
import { fetchIngredients, deleteIngredient } from '../../redux/ingredients';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OpenModalButton from '../../context/OpenModalButton';
import ConfirmDelete from '../modals/ConfirmDelete';
import { useModal } from '../../context/ModalContext';
import NewIngredient from '../modals/NewIngredient';
import './List.css'; // Make sure styles are imported

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
		dispatch(fetchIngredients());
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
				console.error('Error updating checked state:', error);
			});
	};

	const handleDelete = async () => {
		dispatch(deleteList(listId))
			.unwrap()
			.then(() => {
				dispatch(fetchAllLists());
				navigate('/lists');
			})
			.catch((error) => {
				console.error('Error deleting list:', error);
			});
		closeModal();
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;
		const draggedIngredientId = parseInt(result.draggableId, 10);
		const newIngredient = availableIngredients?.find(
			(ing) => ing.id === draggedIngredientId
		);

		if (!newIngredient) return;

		const updatedIngredients = [
			...groceryList.Ingredients,
			{
				id: draggedIngredientId,
				name: newIngredient.name,
				quantity: 1,
				measurement: '',
				checked: false,
			},
		];

		dispatch({
			type: 'lists/updateLocalList',
			payload: {
				listId,
				ingredients: updatedIngredients,
			},
		});

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
				dispatch(fetchGroceryList(listId));
			})
			.catch((error) => console.error('Error adding ingredient:', error));
	};

	if (!groceryList) return <p>Loading grocery list...</p>;

	return (
		<div className='list-container'>
			<button onClick={() => navigate('/lists')} className='back-button'>
				← See My Lists
			</button>

			<p className='list-type'>
				<strong>List Type:</strong>{' '}
				{groceryList.type === 'shopping'
					? '🛒 Shopping List'
					: '✅ To-Do List'}
			</p>

			<h1 className='list-title' onClick={() => setEditingName(true)}>
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
				<p className='recipe-info'>
					<strong>Generated from Recipe:</strong>{' '}
					<Link
						to={`/recipes/${groceryList.recipeId}`}
						className='recipe-link'>
						View Recipe 🍽
					</Link>
				</p>
			)}

			{groceryList.type === 'shopping' && (
				<button
					onClick={toggleAvailableIngredients}
					className='toggle-ingredients-button'>
					{showAvailableIngredients
						? 'Hide Ingredients'
						: 'Show Ingredients to Add'}
				</button>
			)}

			<DragDropContext onDragEnd={onDragEnd}>
				{showAvailableIngredients && (
					<Droppable droppableId='ingredients'>
						{(provided) => (
							<div
								className='ingredient-pool'
								ref={provided.innerRef}
								{...provided.droppableProps}>
								<h3>🛒 Drag Ingredients to List:</h3>
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
				)}

				<Droppable droppableId='groceryList'>
					{(provided) => (
						<ul
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='grocery-list'>
							<h3>📋 My Grocery List:</h3>
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
												className='delete-item'
												onClick={() =>
													dispatch(
														deleteIngredient({
															listId: groceryList.id,
															ingredientId: item.ingredientId,
														})
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
				</Droppable>
			</DragDropContext>

			<OpenModalButton
				modalComponent={
					<ConfirmDelete onConfirm={handleDelete} itemType='list' />
				}
				buttonText='🗑 Delete List'
				className='delete-button'
			/>
		</div>
	);
}
