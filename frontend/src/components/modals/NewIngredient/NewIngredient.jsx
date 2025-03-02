import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createIngredient } from '../../../redux/ingredients';
import {useModal} from '../../../context/ModalContext';
import './NewIngredient.css';

const NewIngredient = ({ onClose }) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: '',
		servingSize: '',
		image: '',
	});

	// Optional fields that the user can select
	const optionalFields = [
		'calories',
		'carbohydrates',
		'protein',
		'fats',
		'fiber',
		'sodium',
		'sugar',
		'calcium',
		'iron',
		'moisture',
	];

	const [selectedFields, setSelectedFields] = useState([]);
	const { closeModal } = useModal();

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSelectField = (e) => {
		const value = e.target.value;

		if (value && !selectedFields.includes(value)) {
			setSelectedFields([...selectedFields, value]);
			setFormData({ ...formData, [value]: '' }); // Add empty field in state
		}
	};

	const handleRemoveField = (field) => {
		setSelectedFields(selectedFields.filter((f) => f !== field));
		const updatedFormData = { ...formData };
		delete updatedFormData[field];
		setFormData(updatedFormData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);

		if (!formData.name.trim()) {
			setError('Ingredient name is required');
			return;
		}

		try {
			await dispatch(createIngredient(formData)).unwrap();
			setSuccess(true);
			setFormData({
				name: '',
				servingSize: '',
				image: '',
			});
			setSelectedFields([]);
			closeModal()
		} catch (err) {
			setError(err || 'Failed to create ingredient');
		}
	};

	return (
		<div className='new-ingredient-modal'>
			<h2>Add a New Ingredient</h2>
			{error && <p className='error'>{error}</p>}
			{success && (
				<p className='success'>Ingredient created successfully!</p>
			)}

			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
						placeholder='Fish Oil'
					/>
				</label>

				<label>
					Serving Size:
					<input
						type='text'
						name='servingSize'
						value={formData.servingSize}
						onChange={handleChange}
						placeholder='50mL'
					/>
				</label>

				<label>
					Image URL:
					<input
						type='text'
						name='image'
						value={formData.image}
						onChange={handleChange}
						placeholder='.png, .jpeg, .jpg, .gif'
					/>
				</label>

				{/* Dropdown for optional fields */}
				<label>
					Add More Fields:
					<select onChange={handleSelectField} value=''>
						<option value='' disabled>
							Select a field
						</option>
						{optionalFields
							.filter((field) => !selectedFields.includes(field))
							.map((field) => (
								<option key={field} value={field}>
									{field.charAt(0).toUpperCase() + field.slice(1)}
								</option>
							))}
					</select>
				</label>

				{/* Show selected fields dynamically */}
				{selectedFields.map((field) => (
					<div key={field} className='selected-field'>
						<label>
							{field.charAt(0).toUpperCase() + field.slice(1)}:
							<input
								type='number'
								name={field}
								value={formData[field] || ''}
								onChange={handleChange}
								min='0'
							/>
						</label>
						<button
							type='button'
							className='remove-field'
							onClick={() => handleRemoveField(field)}>
							✖
						</button>
					</div>
				))}

				<button type='submit'>Create Ingredient</button>
				<button type='button' onClick={onClose}>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default NewIngredient;
