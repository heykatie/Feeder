import { useState, useEffect, useCallback, useMemo } from 'react';
import './ChooseSpecies.css';
import catGif from '/images/forms/cat.apng';
import dogGif from '/images/forms/dog.apng';

const ChooseSpecies = ({ onSelect, selectedSpecies }) => {
	const [selectedPet, setSelectedPet] = useState(selectedSpecies || null);
	const pets = useMemo(() => ['cat', 'dog'], []);
	
	const handlePetSelection = useCallback(
		(pet) => {
			setSelectedPet(pet);
			onSelect(pet);
		},
		[onSelect]
	);

	const handleKeyDown = useCallback(
		(e) => {
			const currentIndex = pets.indexOf(selectedPet);
			let newSelection = selectedPet;

			if (e.key === 'Escape') {
				if (selectedPet) {
					setSelectedPet(null);
					onSelect(null);
				}
				return;
			}

			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				newSelection = pets[(currentIndex + 1) % pets.length];
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				newSelection = pets[(currentIndex - 1 + pets.length) % pets.length];
			}

			if (newSelection !== selectedPet) {
				handlePetSelection(newSelection);
			}
		},
		[selectedPet, onSelect, handlePetSelection, pets]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<div className='pet-selection-container'>
			<h2>Who are we feeding?</h2>
			<div className='pet-options'>
				{pets.map((pet) => (
					<div
						key={pet}
						className={`species-card ${
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
