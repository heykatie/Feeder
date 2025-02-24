import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutPet from './Pet/AboutPet';
import './Embark.css';
import ChooseSpecies from './Pet/ChooseSpecies';
import Signup from './Signup/Signup';
import StartingChef from './StartingChef';

const Embark = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [selection, setSelection] = useState({});
	const [stepValid, setStepValid] = useState(false); // Track if step is valid

	// Function to update validation state when selection changes
	useEffect(() => {
		setStepValid(isStepValid(step));
	}, [step, selection]);

	const handleNext = useCallback(
		(skip = false) => {
			if (!skip && !stepValid) return;
			if (step < forms.length - 1) {
				setStep((prev) => prev + 1);
			} else {
				navigate('/dashboard');
			}
		},
		[step, stepValid, navigate]
	);

	const handleBack = useCallback(() => {
		if (step > 0) {
			setStep((prev) => prev - 1);
		}
	}, [step]);

	const handleExit = useCallback(() => {
		navigate('/');
	}, [navigate]);

	// Check if the current step has required inputs filled
	const isStepValid = (currentStep) => {
		switch (currentStep) {
			case 0: // ChooseSpecies step
				return selection.companion !== undefined;
			case 1: // AboutPet step
				return selection.petName?.trim();
			case 2: // StartingChef step
				return selection.souschefName?.trim();
			case 3: // Signup step
				return (
					selection.username?.trim() &&
					selection.email?.trim() &&
					selection.password?.trim()
				);
			default:
				return true;
		}
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.key === 'Enter' || e.key === ' ') && stepValid) {
				handleNext();
			} else if (e.key === ' ' && !stepValid) {
				handleNext(true); // Skip if space is pressed
			} else if (e.key === 'Backspace') {
				handleBack();
			} else if (e.key === 'Escape') {
				handleExit();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleNext, handleBack, handleExit, step, stepValid]);

	const forms = [
		{
			id: 0,
			component: (
				<ChooseSpecies
					onSelect={(companion) =>
						setSelection({ ...selection, companion })
					}
				/>
			),
		},
		{
			id: 1,
			component: (
				<AboutPet
					onUpdate={(petName) => setSelection({ ...selection, petName })}
				/>
			),
		},
		{
			id: 2,
			component: (
				<StartingChef
					onUpdate={(souschefName) =>
						setSelection({ ...selection, souschefName })
					}
				/>
			),
		},
		{
			id: 3,
			component: (
				<Signup
					onUpdate={(userData) =>
						setSelection({ ...selection, ...userData })
					}
				/>
			),
		},
	];

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
				{/* Button updates dynamically based on validation */}
				<button className='next-btn' onClick={() => handleNext(!stepValid)}>
					{stepValid ? 'Continue →' : 'Skip →'}
				</button>
			</div>
		</div>
	);
};

export default Embark;
