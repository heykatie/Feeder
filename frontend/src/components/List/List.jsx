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
	const [servings, setServings] = useState(groceryList?.servings || 1);
	const [measurements, setMeasurements] = useState([]);
	const [measurementMap, setMeasurementMap] = useState({});

	const measurementConversions = {
		cup: { next: 'tablespoon', prev: null, factor: 16 }, // 1 cup = 16 tbsp
		tablespoon: { next: 'teaspoon', prev: 'cup', factor: 3 }, // 1 tbsp = 3 tsp
		teaspoon: { next: null, prev: 'tablespoon', factor: 1 }, // Smallest unit for liquid
		ounce: { next: 'gram', prev: 'pound', factor: 28.35 }, // 1 oz = 28.35 g
		pound: { next: 'ounce', prev: null, factor: 16 }, // 1 lb = 16 oz
		gram: { next: 'milligram', prev: 'ounce', factor: 1000 }, // 1 g = 1000 mg
		kilogram: { next: 'gram', prev: null, factor: 1000 }, // 1 kg = 1000 g
		liter: { next: 'milliliter', prev: null, factor: 1000 }, // 1 l = 1000 ml
		milliliter: { next: null, prev: 'liter', factor: 1 }, // ml is smallest liquid unit
		piece: { next: null, prev: null, factor: 1 }, // Non-convertible units
		slice: { next: null, prev: null, factor: 1 },
	};

	useEffect(() => {
		async function fetchMeasurements() {
			const response = await fetch('/api/measurements');
			const data = await response.json();

			const conversions = {};
			data.forEach((m, index) => {
				conversions[m.name] = {
					id: m.id,
					abbreviation: m.abbreviation,
					conversionFactor: m.conversionFactor || 1,
					next: index < data.length - 1 ? data[index + 1].name : null,
					prev: index > 0 ? data[index - 1].name : null,
				};
			});

			setMeasurements(data);
			setMeasurementMap(conversions);
		}
		fetchMeasurements();
	}, []);


	useEffect(() => {
		async function fetchMeasurements() {
			const response = await fetch('/api/measurements');
			const data = await response.json();
			setMeasurements(data);
		}
		fetchMeasurements();
	}, []);

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

	const handleCheck = async (ingredientId) => {
		const newCheckedState = !checkedItems[ingredientId];
		setCheckedItems((prev) => ({ ...prev, [ingredientId]: newCheckedState }));

		dispatch(
			toggleChecked({ listId, ingredientId, checked: newCheckedState })
		)
			.unwrap()
			.catch((error) =>
				console.error('❌ Error updating checked state:', error)
			);
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

	const handleServingsChange = (e) => {
		const newServings = Number(e.target.value);
		setServings(newServings);
	};

	const convertMeasurement = (quantity, measurement) => {
		if (!measurementConversions[measurement])
			return { quantity, measurement }; // No conversion needed

		let currentMeasurement = measurement;
		let currentQuantity = quantity;

		// ✅ Convert downward if the quantity is too small (e.g., 0.25 cup → tbsp)
		while (
			currentMeasurement &&
			measurementConversions[currentMeasurement]?.next &&
			currentQuantity < 0.5 // Convert down if less than 0.5 of current unit
		) {
			const conversion = measurementConversions[currentMeasurement];
			currentQuantity *= conversion.factor;
			currentMeasurement = conversion.next;
		}

		// ✅ Convert upward if the quantity is too large (e.g., 32 tbsp → 2 cups)
		while (
			currentMeasurement &&
			measurementConversions[currentMeasurement]?.prev &&
			currentQuantity >= measurementConversions[currentMeasurement].factor
		) {
			const conversion = measurementConversions[currentMeasurement];
			currentQuantity /= conversion.factor;
			currentMeasurement = conversion.prev;
		}

		return {
			quantity:
				currentQuantity % 1 === 0
					? currentQuantity
					: currentQuantity.toFixed(2),
			measurement: currentMeasurement,
		};
	};

	const calculateQuantity = (
		baseQuantity,
		baseServings,
		currentServings,
		measurement
	) => {
		const numericQuantity = Number(baseQuantity) || 1;
		const scaledQuantity = (numericQuantity * currentServings) / baseServings;
		return convertMeasurement(scaledQuantity, measurement);
	};

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
			<label>
				Servings:
				<input
					type='number'
					min='1'
					value={servings}
					onChange={handleServingsChange}
				/>
			</label>
			<ul>
				{groceryList.Ingredients?.map((item) => {
        const { quantity, measurement } = calculateQuantity(
            item.quantity,
            groceryList.servings,
            servings,
            item.measurement
				);
				return (
					<li key={item.id}>
							<label>
									<input
											type="checkbox"
											checked={checkedItems[item.id] || false}
											onChange={() => handleCheck(item.id)}
													/>
													<span>
															{quantity} {measurement} - {item.name}
													</span>
											</label>
									</li>
							);
					})}
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