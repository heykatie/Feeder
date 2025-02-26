import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import './AboutPet.css';

const AboutPet = ({
	onUpdate,
	selectedSpecies,
	initialData = null,
	mode = 'onboarding',
}) => {
	const isEditMode = mode === 'edit';
	const isAddMode = mode === 'add';
	const { pets, status, error } = useSelector((state) => state.pets);

	const [formData, setFormData] = useState({
		petName: initialData?.petName || '',
		species: selectedSpecies || initialData?.species || '',
		breed: initialData?.breed || '',
		age: initialData?.age || '',
		weight: initialData?.weight || '',
		allergies: initialData?.allergies || '',
		notes: initialData?.notes || '',
		image: initialData?.image || '',
		birthday: initialData?.birthday || '',
	});

	const [debouncedFormData, setDebouncedFormData] = useState(formData);

	// Debounce effect: Wait 500ms after typing stops before updating state
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedFormData(formData);
		}, 500);

		return () => clearTimeout(timer); // Cleanup timer on every re-render
	}, [formData]);

	// This will fire only after the user has stopped typing for 500ms
	useEffect(() => {
		if (isEditMode && initialData?.id) {
			onUpdate({ ...debouncedFormData, id: initialData.id });
		}
	}, [debouncedFormData, isEditMode, initialData, onUpdate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitting form data:', formData); 
		if (isEditMode) {
			onUpdate({ ...formData, id: initialData?.id });
		} else {
			onUpdate(formData);
		}
	};

	return (
		<div
			className={`about-pet-container ${
				isEditMode ? 'edit-mode' : isAddMode ? 'add-mode' : ''
			}`}>
			<div className='about-pet-form'>
				<h2>
					{isEditMode
						? 'Edit Pet Details'
						: isAddMode
						? 'Add a New Pet'
						: `Tell us about your ${formData.species || 'baby'}`}
				</h2>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='petName'
						placeholder='Name*'
						value={formData.petName}
						onChange={handleChange}
						required
					/>
					{isAddMode && (
						<select
							name='species'
							className='species-select'
							value={formData.species}
							onChange={handleChange}
							required>
							<option value=''>Select Species*</option>
							<option value='dog'>Dog</option>
							<option value='cat'>Cat</option>
						</select>
					)}
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
						placeholder='Any allergies?'
						value={formData.allergies}
						onChange={handleChange}></textarea>
					<textarea
						name='notes'
						placeholder='Additional notes'
						value={formData.notes}
						onChange={handleChange}></textarea>

					<div className='file-upload-container'>
						<input
							type='file'
							accept='image/*'
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									image: URL.createObjectURL(e.target.files[0]),
								}))
							}
						/>
					</div>

					{(isEditMode || isAddMode) && (
						<button type='submit' className='save-btn'>
							{isEditMode ? 'Save Changes' : 'Add Pet'}
						</button>
					)}
				</form>
				{error && error.message}
			</div>

			{formData.image && (
				<div className='image-preview-container'>
					<img src={formData.image} alt='Pet' className='preview-image' />
				</div>
			)}
		</div>
	);
};

export default AboutPet;
