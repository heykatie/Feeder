import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchGroceryList,
	saveListName,
	toggleChecked,
	deleteList, // ✅ Import deleteList thunk
} from '../../redux/lists';
import OpenModalButton from '../../context/OpenModalButton';
import ConfirmDelete from '../modals/ConfirmDelete';

export default function List() {
	const { listId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const groceryList = useSelector((state) => state.lists.currentList);
	const [editingName, setEditingName] = useState(false);
	const [listName, setListName] = useState(groceryList?.name || '');
	const [checkedItems, setCheckedItems] = useState({});

	useEffect(() => {
		dispatch(fetchGroceryList(listId));
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
				console.error('❌ Error updating checked state:', error);
			});
	};

	// ✅ Handle List Deletion
	const handleDelete = async () => {
		dispatch(deleteList(listId))
			.unwrap()
			.then(() => {
				navigate('/lists'); // ✅ Redirect after deletion
			})
			.catch((error) => {
				console.error('❌ Error deleting list:', error);
			});
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

			<ul>
				{groceryList.Ingredients?.map((item) => (
					<li key={item.id}>
						<label>
							<input
								type='checkbox'
								checked={checkedItems[item.id] || false}
								onChange={() => handleCheck(item.id)}
							/>
							<span>{item.name}</span>
						</label>
					</li>
				))}
			</ul>

			<OpenModalButton
				modalComponent={<ConfirmDelete onConfirm={handleDelete} />}
				buttonText='Delete List'
				className='delete-button'
			/>
		</div>
	);
}
