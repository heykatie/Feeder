import { useState, useEffect } from 'react';
import './AboutPet.css';

const AboutPet = ({ onUpdate, selectedSpecies, initialData }) => {
	const [formData, setFormData] = useState({
		petName: initialData.petName || '',
		species: selectedSpecies || initialData.species || '',
		breed: initialData.breed || '',
		age: initialData.age || '',
		weight: initialData.weight || '',
		allergies: initialData.allergies || '',
		notes: initialData.notes || '',
		image: initialData.image || '',
		birthday: initialData.birthday || '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target; // ✅ Correct destructuring
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

	useEffect(() => {
		if (formData.petName.trim() !== '' && formData.petName !== selectedSpecies) {
			onUpdate({ petName: formData.petName });
		}
	}, [formData.petName]);

	return (
		<div className='about-pet-container'>
			{/* Form Section */}
			<div className='about-pet-form'>
				<h2>Tell us about your {formData.species || 'baby'}</h2>

				<form>
					<input
						type='text'
						name='petName'
						placeholder='Name*'
						value={formData.petName}
						onChange={handleChange}
						required
					/>

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
						required
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

					{/* File Upload */}
					<div className='file-upload-container'>
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
						/>
					</div>
				</form>
			</div>

			{/* Image Preview Section - Outside the Form */}
			{formData.image && (
				<div className='image-preview-container'>
					<img src={formData.image} alt='Pet' className='preview-image' />
				</div>
			)}
		</div>
	);
};

export default AboutPet;