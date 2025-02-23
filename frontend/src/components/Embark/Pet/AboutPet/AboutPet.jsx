import { useState } from 'react';
import './AboutPet.css';

const AboutPet = () => {
	const [formData, setFormData] = useState({
		name: '',
		breed: '',
		age: '',
		weight: '',
		allergies: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Pet data submitted:', formData);
		// Send data to backend or store in Redux
	};

	return (
		<div className='about-pet-container'>
			<img
				src='/images/logo.png'
				alt='SousChef Logo'
				className='page-logo'
			/>
			<h2>Tell us about your baby</h2>

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Name'
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
					placeholder='Weight'
					value={formData.weight}
					onChange={handleChange}
				/>
				<textarea
					name='allergies'
					placeholder='Any allergies or notes'
					value={formData.allergies}
					onChange={handleChange}></textarea>

				<button type='submit' className='save-btn'>
					Save
				</button>
			</form>
		</div>
	);
};

export default AboutPet;
