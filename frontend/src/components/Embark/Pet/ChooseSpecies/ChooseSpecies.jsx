import { useState, useEffect } from 'react';
import './ChooseSpecies.css';
import catGif from '/images/cat.apng';
import dogGif from '/images/dog.apng';

const ChooseSpecies = ({ onSelect, onChangeSelection }) => {
	const [selectedPet, setSelectedPet] = useState(null);
	const pets = ['cat', 'dog'];

	useEffect(() => {
		const handleSelection = (e) => {
			const currentIndex = pets.indexOf(selectedPet);

			if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
				const nextIndex = (currentIndex + 1) % pets.length;
				setSelectedPet(pets[nextIndex]);
				onChangeSelection(pets[nextIndex]);
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				const prevIndex = (currentIndex - 1 + pets.length) % pets.length;
				setSelectedPet(pets[prevIndex]);
				onChangeSelection(pets[prevIndex]);
			}
		};

		window.addEventListener('keydown', handleSelection);
		return () => window.removeEventListener('keydown', handleSelection);
	}, [selectedPet, onChangeSelection]);

	return (
		<div className='pet-selection-container'>
			<h2>Who are we feeding?</h2>
			<div className='pet-options'>
				<div
					className={`pet-card ${selectedPet === 'cat' ? 'selected' : ''}`}
					onClick={() => {
						setSelectedPet('cat');
						onChangeSelection('cat');
					}}
					tabIndex='0'>
					<img src={catGif} alt='Cat' className='pet-gif' />
					<p>Cat</p>
				</div>
				<div
					className={`pet-card ${selectedPet === 'dog' ? 'selected' : ''}`}
					onClick={() => {
						setSelectedPet('dog');
						onChangeSelection('dog');
					}}
					tabIndex='0'>
					<img src={dogGif} alt='Dog' className='pet-gif' />
					<p>Dog</p>
				</div>
			</div>
		</div>
	);
};

export default ChooseSpecies;
