import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutPet from './Pet/AboutPet';
import './Embark.css';
import ChooseSpecies from './Pet/ChooseSpecies';

const Embark = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);

	const handleSelectPet = (pet) => {
		setStep(step + 1);
	};

	// Example Forms (Add more as needed)
	const forms = [
		{ id: 0, component: <ChooseSpecies onSelect={handleSelectPet} /> },
		{ id: 1, component: <AboutPet /> }, // Placeholder
		{ id: 2, component: <h2>Choose Your Starting Pack</h2> }, // Placeholder
	];

	// **Handle swipe gestures**
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowRight' && step < forms.length - 1) {
				setStep(step + 1);
			}
			if (e.key === 'ArrowLeft' && step > 0) {
				setStep(step - 1);
			}
			if (e.key === 'Escape') {
				handleExit(); // Exit when Esc is pressed
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [step]);

	// **Handle next step when clicking Continue**
	const handleNext = () => {
		if (step < forms.length - 1) {
			setStep(step + 1);
		} else {
			navigate('/dashboard'); // Redirect after last step
		}
	};

	// **Handle previous step**
	const handleBack = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const handleExit = () => {
		navigate('/'); // Navigate back to home
	};


	return (
		<div className='embark-container'>
			<button className='exit-btn' onClick={handleExit}>
				✖ Exit
			</button>
			<div className='form-step'>{forms[step].component}</div>
			<div className='nav-buttons'>
				{step > 0 && (
					<button className='back-btn' onClick={handleBack}>
						← Back
					</button>
				)}
				<button className='next-btn' onClick={handleNext}>
					{step < forms.length - 1 ? 'Continue →' : 'Finish'}
				</button>
			</div>
		</div>
	);
};

export default Embark;
