import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import { useSelector } from 'react-redux';
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
	const { closeModal } = useModal();

	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		species: selectedSpecies || initialData?.species || '',
		breed: initialData?.breed || '',
		age: initialData?.age || '',
		weight: initialData?.weight || '',
		allergies: initialData?.allergies || '',
		notes: initialData?.notes || '',
		image: initialData?.image || '',
		birthday: initialData?.birthday || '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		onUpdate({ [name]: value });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({ ...prev, image: imageUrl }));
			onUpdate({ image: imageUrl, file });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdate(formData);
		closeModal();
	};

	useEffect(() => {
		if (formData.name.trim() !== '' && formData.name !== selectedSpecies) {
			onUpdate({ name: formData.name });
		}
	}, [formData.name]);

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
						name='name'
						placeholder='Name'
						value={formData.name}
						onChange={handleChange}
					/>

					{isAddMode && (
						<select
							name='species'
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
						min='0'
					/>
					<input
						type='number'
						name='weight'
						placeholder='Weight (lbs)'
						value={formData.weight}
						onChange={handleChange}
						min='0'
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
							onChange={handleFileChange}
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
