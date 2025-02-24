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
	const [selection, setSelection] = useState({
		companion: '',
		name: '',
		breed: '',
		age: '',
		weight: '',
		birthday: '',
		allergies: '',
		notes: '',
		image: '',
		souschefName: '',
		email: '',
		password: '',
	});

	const [stepValid, setStepValid] = useState(false);
	const [showExitModal, setShowExitModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setStepValid(isStepValid(step));
	}, [step, selection]);

	const handleNext = async (skip = false) => {
		if (!skip && !stepValid) return;

		if (step === 0 && !selection.companion) {
			setStep(2);
		} else if (step < forms.length - 1) {
			setStep((prev) => prev + 1);
		} else {
			await handleSubmit();
		}
	};

	const handleBack = useCallback(() => {
		if (step === 2 && !selection.companion) {
			setStep(0);
		} else if (step > 0) {
			setStep((prev) => prev - 1);
		}
	}, [step, selection.companion]);

	const handleExit = useCallback(() => {
		setShowExitModal(true);
	}, []);

	const handleSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const userResponse = await fetch('/api/users/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: selection.username,
					email: selection.email,
					password: selection.password,
				}),
			});

			if (!userResponse.ok) throw new Error('Failed to create user');

			const userData = await userResponse.json();
			const userId = userData.id;

			const petResponse = await fetch('/api/pets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId,
					name: selection.name,
					species: selection.companion,
					breed: selection.breed,
					age: selection.age,
					weight: selection.weight,
					birthday: selection.birthday,
					allergies: selection.allergies,
					notes: selection.notes,
					image: selection.image,
				}),
			});

			if (!petResponse.ok) throw new Error('Failed to create pet');

			navigate('/dashboard');
		} catch (error) {
			console.error('Error:', error);
			alert('Something went wrong! Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			const activeElement = document.activeElement;
			const isInputField =
				activeElement.tagName === 'INPUT' ||
				activeElement.tagName === 'TEXTAREA' ||
				activeElement.tagName === 'SELECT';

			if (isInputField) return;

			if ((e.key === 'Enter' || e.key === ' ') && stepValid) {
				handleNext();
			} else if (e.key === ' ' && !stepValid) {
				handleNext(true);
			} else if (e.key === 'Backspace') {
				handleBack();
			} else if (e.key === 'Escape') {
				setShowExitModal(true);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
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
					typeof selection.name === 'string' &&
					selection.name.trim() !== ''
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
					selectedSpecies={selection.companion}
					onUpdate={(petData) =>
						setSelection((prev) => ({ ...prev, name: petData.name }))
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
				<button
					className='next-btn'
					onClick={() => handleNext(!stepValid)}
					disabled={isSubmitting}>
					{isSubmitting
						? 'Personalizing your journey...'
						: stepValid
						? 'Continue →'
						: 'Skip →'}
				</button>
			</div>

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
