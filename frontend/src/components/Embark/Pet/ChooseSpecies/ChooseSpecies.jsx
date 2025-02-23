import { useState, useEffect } from 'react';
import './ChooseSpecies.css';
import catGif from '/images/cat.apng';
import dogGif from '/images/dog.apng';

const ChooseSpecies = ({ onSelect }) => {
	const [selectedPet, setSelectedPet] = useState(null);

	const handleSelect = (pet) => {
		setSelectedPet(pet);
		setTimeout(() => onSelect(pet), 500);
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Enter' && selectedPet) {
				onSelect(selectedPet);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [selectedPet]);

	return (
		<div className='pet-selection-container'>
			<h2>Who are we feeding?</h2>
			<div className='pet-options'>
				<div
					className={`pet-card ${selectedPet === 'cat' ? 'selected' : ''}`}
					onClick={() => handleSelect('cat')}>
					<img src={catGif} alt='Cat' className='pet-gif' />
					<p>Cat</p>
				</div>
				<div
					className={`pet-card ${selectedPet === 'dog' ? 'selected' : ''}`}
					onClick={() => handleSelect('dog')}>
					<img src={dogGif} alt='Dog' className='pet-gif' />
					<p>Dog</p>
				</div>
			</div>
		</div>
	);
};

export default ChooseSpecies;
