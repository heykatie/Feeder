import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutPet from './pet/AboutPet';
import './Embark.css';
import ChooseSpecies from './pet/ChooseSpecies';
import Signup from './Signup/Signup';
import StartingChef from './StartingChef';
import ConfirmExit from '../models/ConfirmExit';

const Embark = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const [selection, setSelection] = useState({});
	const [stepValid, setStepValid] = useState(false);
	const [showExitModal, setShowExitModal] = useState(false);

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
		setShowExitModal(true); // ✅ Open exit confirmation modal instead of navigating
	}, []);

	// Prevent accidental exits with the Escape key
	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.key === 'Enter' || e.key === ' ') && stepValid) {
				handleNext();
			} else if (e.key === ' ' && !stepValid) {
				handleNext(true); // Skip if space is pressed
			} else if (e.key === 'Backspace') {
				handleBack();
			} else if (e.key === 'Escape') {
				setShowExitModal(true); // ✅ Show exit confirmation instead of exiting immediately
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown); // ✅ Cleanup event listener
	}, [handleNext, handleBack, step, stepValid]);

	const isStepValid = (currentStep) => {
		switch (currentStep) {
			case 0:
				return (
					typeof selection.companion === 'string' &&
					selection.companion.trim() !== ''
				);
			case 1:
				return (
					typeof selection.petName === 'string' &&
					selection.petName.trim() !== ''
				);
			case 2:
				return (
					typeof selection.souschefName === 'string' &&
					selection.souschefName.trim() !== ''
				);
			case 3:
				return (
					typeof selection.username === 'string' &&
					typeof selection.email === 'string' &&
					typeof selection.password === 'string' &&
					selection.username.trim() !== '' &&
					selection.email.trim() !== '' &&
					selection.password.trim() !== ''
				);
			default:
				return true;
		}
	};

	const forms = [
		{
			id: 0,
			component: (
				<ChooseSpecies
					onSelect={(companion) =>
						setSelection((prev) => ({ ...prev, companion }))
					}
				/>
			),
		},
		{
			id: 1,
			component: (
				<AboutPet
					onUpdate={(petName) =>
						setSelection((prev) => ({ ...prev, petName }))
					}
				/>
			),
		},
		{
			id: 2,
			component: (
				<StartingChef
					onUpdate={(souschefName) =>
						setSelection((prev) => ({ ...prev, souschefName }))
					}
				/>
			),
		},
		{
			id: 3,
			component: (
				<Signup
					onUpdate={(userData) =>
						setSelection((prev) => ({ ...prev, ...userData }))
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
				<button className='next-btn' onClick={() => handleNext(!stepValid)}>
					{stepValid ? 'Continue →' : 'Skip →'}
				</button>
			</div>

			{/* ✅ Pass showExitModal and setShowExitModal to ConfirmExit */}
			{showExitModal && (
				<ConfirmExit
					showExitModal={showExitModal}
					setShowExitModal={setShowExitModal}
				/>
			)}
		</div>
	);
};

export default Embark;
