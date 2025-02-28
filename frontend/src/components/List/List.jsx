import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroceryList, toggleChecked } from '../../redux/lists';

export default function List() {
	const lists = useSelector((state) => state.lists.allLists);
	const { listId } = useParams();
	const dispatch = useDispatch();
	const groceryList = useSelector((state) =>
		state.lists.allLists.find((list) => list.id === Number(listId))
	);

	const [checkedItems, setCheckedItems] = useState({});

	useEffect(() => {
		if (groceryList?.Ingredients) {
			const initialCheckedState = groceryList.Ingredients.reduce(
				(acc, item) => {
					acc[item.id] = item.checked;
					return acc;
				},
				{}
			);
			setCheckedItems(initialCheckedState);
		}
	}, [groceryList]);

	useEffect(() => {
		if (listId) {
			dispatch(fetchGroceryList(listId));
		}
	}, [dispatch, listId]);

	const handleCheck = (ingredientId) => {
		setCheckedItems((prev) => ({
			...prev,
			[ingredientId]: !prev[ingredientId],
		}));
	};

	const navigate = useNavigate();

	const saveList = async () => {
		try {
			await Promise.all(
				Object.entries(checkedItems).map(([ingredientId, checked]) =>
					toggleChecked(listId, ingredientId, checked)
				)
			);
			navigate(-1);
		} catch (error) {
			console.error('Error saving list:', error);
		}
	};

	if (!groceryList) return <p>Loading grocery list...</p>;

	return (
		<div className='list-container'>
			<h1>{groceryList.name}</h1>
			<ul>
				{groceryList.Ingredients && groceryList.Ingredients.length > 0 ? (
					groceryList.Ingredients.map((item) => (
						<li key={item.id}>
							<label>
								<input
									type='checkbox'
									checked={checkedItems[item.id] || false}
									onChange={() => handleCheck(item.id)}
								/>
								{item.quantity} {item.name}
							</label>
						</li>
					))
				) : (
					<p>No ingredients found for this list.</p>
				)}
			</ul>
			<button className='save-btn' onClick={saveList}>
				Save List
			</button>
		</div>
	);
}
