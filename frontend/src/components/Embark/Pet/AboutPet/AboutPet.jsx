import { useState, useEffect } from 'react';
import './AboutPet.css';

const AboutPet = ({ onUpdate }) => {
	const [formData, setFormData] = useState({
		name: '',
		breed: '',
		age: '',
		weight: '',
		allergies: '',
	});

	// Handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.petName]: e.target.value });
	};

	useEffect(() => {
		onUpdate(formData.name || '');
	}, [formData.name, onUpdate]);

	return (
		<div className='about-pet-container'>
			<img
				src='/images/logo.png'
				alt='SousChef Logo'
				className='page-logo'
			/>
			<h2>Tell us about your pet</h2>

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
					placeholder='Weight'
					value={formData.weight}
					onChange={handleChange}
				/>
				<textarea
					name='allergies'
					placeholder='Any allergies or notes'
					value={formData.allergies}
					onChange={handleChange}></textarea>
			</form>
		</div>
	);
};

export default AboutPet;
