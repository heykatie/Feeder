import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutPet from './Pet/AboutPet';
import './Embark.css';
import ChooseSpecies from './Pet/ChooseSpecies';
import Signup from './Signup/Signup';
import PickSousChef from './PickSousChef';

const Embark = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);

	const handleSelectPet = (pet) => {
		setStep(step + 1);
	};

	const handleNext = () => {
		if (step < forms.length - 1) {
			setStep(step + 1);
		} else {
			navigate('/dashboard');
		}
	};

	const forms = [
		{ id: 0, component: <ChooseSpecies onSelect={handleSelectPet} /> },
		{ id: 1, component: <AboutPet /> },
		{ id: 2, component: <PickSousChef/> },
		{ id: 3, component: <Signup onNext={handleNext} /> }, // Add Signup as the 4th step
	];

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Enter' && step === 3) {
				handleNext();
			}
			if (e.key === 'ArrowRight' && step < forms.length - 1) {
				handleNext();
			}
			if (e.key === 'ArrowLeft' && step > 0) {
				handleBack();
			}
			if (e.key === 'Escape') {
				handleExit();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [step]);

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
