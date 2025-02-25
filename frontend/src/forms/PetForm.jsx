import { useState } from 'react';
import './PetForm.css';

const PetForm = ({ onSubmit, initialData = {} }) => {
	const [formData, setFormData] = useState({
		name: initialData.name || '',
		species: initialData.species || '',
		breed: initialData.breed || '',
		age: initialData.age || '',
		weight: initialData.weight || '',
		allergies: initialData.allergies || '',
		notes: initialData.notes || '',
		image: initialData.image || '',
		birthday: initialData.birthday || '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({ ...prev, image: imageUrl, file }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className='pet-form'>
			<input
				type='text'
				name='name'
				placeholder='Pet Name'
				value={formData.name}
				onChange={handleChange}
				required
			/>
			<select
				name='species'
				value={formData.species}
				onChange={handleChange}
				required>
				<option value=''>Select Species</option>
				<option value='dog'>Dog</option>
				<option value='cat'>Cat</option>
			</select>
			<input
				type='text'
				name='breed'
				placeholder='Breed'
				value={formData.breed}
				onChange={handleChange}
			/>
			<input
				type='number'
				name='age'
				placeholder='Age'
				value={formData.age}
				onChange={handleChange}
			/>
			<input
				type='number'
				name='weight'
				placeholder='Weight (lbs)'
				value={formData.weight}
				onChange={handleChange}
			/>
			<input
				type='date'
				name='birthday'
				value={formData.birthday}
				onChange={handleChange}
			/>
			<textarea
				name='allergies'
				placeholder='Allergies'
				value={formData.allergies}
				onChange={handleChange}></textarea>
			<textarea
				name='notes'
				placeholder='Notes'
				value={formData.notes}
				onChange={handleChange}></textarea>
			<input type='file' accept='image/*' onChange={handleFileChange} />
			<button type='submit'>Save Pet</button>
		</form>
	);
};

export default PetForm;
