import { useState, useEffect } from 'react';
import './ChooseSpecies.css';
import catGif from '/images/cat.apng';
import dogGif from '/images/dog.apng';

const ChooseSpecies = ({ onSelect }) => {
	const [selectedPet, setSelectedPet] = useState(null);
	const pets = ['cat', 'dog'];

	const handlePetSelection = (pet) => {
		setSelectedPet(pet);
		onSelect(pet); // ✅ Call onSelect immediately
	};

	useEffect(() => {
		const handleSelection = (e) => {
			const currentIndex = pets.indexOf(selectedPet);
			let newSelection = selectedPet;

			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				newSelection = pets[(currentIndex + 1) % pets.length];
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				newSelection = pets[(currentIndex - 1 + pets.length) % pets.length];
			}

			if (newSelection !== selectedPet) {
				handlePetSelection(newSelection);
			}
		};

		window.addEventListener('keydown', handleSelection);
		return () => window.removeEventListener('keydown', handleSelection);
	}, [selectedPet]);

	return (
		<div className='pet-selection-container'>
			<h2>Who are we feeding?</h2>
			<div className='pet-options'>
				{pets.map((pet) => (
					<div
						key={pet}
						className={`pet-card ${
							selectedPet === pet ? 'selected' : ''
						}`}
						onClick={() => handlePetSelection(pet)}
						tabIndex='0'>
						<img
							src={pet === 'cat' ? catGif : dogGif}
							alt={pet}
							className='pet-gif'
						/>
						<p>{pet.charAt(0).toUpperCase() + pet.slice(1)}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChooseSpecies;