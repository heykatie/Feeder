import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchGroceryList,
	saveListName,
	toggleChecked,
} from '../../redux/lists';

export default function List() {
	const { listId } = useParams();
	const dispatch = useDispatch();
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

	useEffect(() => {
		const saveBeforeExit = () => {
			if (Object.keys(checkedItems).length > 0) {
				try {
					const url = `/api/lists/${listId}/bulk-update`;
					const data = JSON.stringify({ checkedItems });
					navigator.sendBeacon(url, data);
					console.log('✅ Auto-saved before exit');
				} catch (error) {
					console.error('❌ Error saving before exit:', error);
				}
			}
		};

		window.addEventListener('beforeunload', saveBeforeExit);
		return () => window.removeEventListener('beforeunload', saveBeforeExit);
	}, [checkedItems, listId]);



	if (!groceryList) return <p>Loading grocery list...</p>;

	return (
		<div className='list-container'>
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
			<ul>
				{groceryList.Ingredients?.map((item) =>
					<li key={item.id}>
						<label>
							<input
								type="checkbox"
								checked={checkedItems[item.id] || false}
								onChange={() => handleCheck(item.id)}
							/>
							<span>
								{item.name}
							</span>
						</label>
					</li>)
				}
			</ul>
		</div>
	);
}

							// <span>
							// 	{calculateQuantity(
							// 		item.quantity,
							// 		groceryList.servings,
							// 		servings
							// 	)}
							// 	{/* {item.measurement && ` ${item.measurement}`}{''} */}
							// </span>
							// <span>
							// 	{item.measurement ? (
							// 		<span> {item.measurement} </span>
							// 	) : (
							// 		<select
							// 			value={item.measurementId || ''}
							// 			onChange={(e) =>
							// 				setCheckedItems((prev) => ({
							// 					...prev,
							// 					[item.id]: {
							// 						...prev[item.id],
							// 						measurementId: Number(e.target.value),
							// 					},
							// 				}))
							// 			}>
							// 			<option value=''>Select Measurement</option>
							// 			{measurements.map((m) => (
							// 				<option key={m.id} value={m.id}>
							// 					{m.name}
							// 				</option>
							// 			))}
							// 		</select>
							// 	)}{' '}
							// 	- {item.name}
							// </span>