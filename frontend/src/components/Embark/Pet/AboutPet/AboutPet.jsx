import { useState, useEffect } from 'react';
import './AboutPet.css';

const AboutPet = ({ onUpdate, selectedSpecies }) => {
	const [formData, setFormData] = useState({
		name: '',
		species: selectedSpecies || '',
		breed: '',
		age: '',
		weight: '',
		allergies: '',
		notes: '',
		image: '',
		birthday: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
		}
	};

	useEffect(() => {
		if (formData.name.trim() !== '') {
			onUpdate({ name: formData.name });
		}
	}, [formData.name, onUpdate]);

	// useEffect(() => {
	// 	onUpdate({ name: formData.name });
	// }, [formData.name, onUpdate]);

	return (
		<div className='about-pet-container'>
			{/* Form Section */}
			<div className='about-pet-form'>
				<h2>Tell us about your {formData.species || 'baby'}</h2>

				<form>
					<input
						type='text'
						name='name'
						placeholder='Name*'
						value={formData.name}
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