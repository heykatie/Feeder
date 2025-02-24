import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutPet from './pet/AboutPet';
import './Embark.css';
import ChooseSpecies from './pet/ChooseSpecies';
import Signup from './Signup/Signup';
import StartingChef from './StartingChef';
import ConfirmExit from '../models/ConfirmExit';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/users';
import { createPet } from '../../redux/pets';
import { updateSousChef } from '../../redux/souschef';

const Embark = () => {
	const dispatch = useDispatch();
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
		sousChefName: '',
		email: '',
		password: '',
	});

	const [stepValid, setStepValid] = useState(false);
	const [showExitModal, setShowExitModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [prevStepValid, setPrevStepValid] = useState(false);
	const [buttonText, setButtonText] = useState('Skip →');

	useEffect(() => {
		if (stepValid !== prevStepValid) {
			setButtonText(stepValid ? 'Continue →' : 'Skip →');

			if (stepValid) {
				const btn = document.querySelector('.embark-next-btn.continue');
				if (btn) {
					btn.classList.remove('animate');
					void btn.offsetWidth;
					btn.classList.add('animate');
				}
			}

			setPrevStepValid(stepValid);
		}
	}, [stepValid, prevStepValid]);

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
		// setSelection({
		// 	companion: '',
		// 	name: '',
		// 	breed: '',
		// 	age: '',
		// 	weight: '',
		// 	birthday: '',
		// 	allergies: '',
		// 	notes: '',
		// 	image: '',
		// 	sousChefName: '',
		// 	email: '',
		// 	password: '',
		// });
		setShowExitModal(true);
		setTimeout(() => {
			navigate('/', { replace: true });
			setStep(0);
		}, 0);
	}, []);


	const handleSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const newUser = {
				username: selection.username,
				email: selection.email,
				password: selection.password,
			};
			const userResponse = await dispatch(signup(newUser));

			if (!userResponse.ok) throw new Error('Failed to create user');

			const userData = await userResponse.json();
			const userId = userData.id;
			const sousChefId = userData.sousChef.id;

			await dispatch(
				createPet({
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
				})
			);

			const sousChefUpdates = {};
			if (selection.sousChefName)
				sousChefUpdates.name = selection.sousChefName;
			if (selection.eyeShape) sousChefUpdates.eyeShape = selection.eyeShape;
			if (selection.color) sousChefUpdates.color = selection.color;
			if (selection.personality)
				sousChefUpdates.personality = selection.personality;

			if (Object.keys(sousChefUpdates).length > 0) {
				await dispatch(
					updateSousChef({ sousChefId, sousChefData: sousChefUpdates })
				);
			}

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

			if (e.key === 'Escape') {
				if (isInputField) {
					activeElement.blur();
				} else {
					setShowExitModal(true);
				}
			} else if ((e.key === 'Enter' || e.key === ' ') && stepValid) {
				handleNext();
			} else if (e.key === ' ' && !stepValid) {
				handleNext(true);
			} else if (e.key === 'Backspace') {
				handleBack();
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
				(selection.sousChefName?.trim() !== '' &&
					selection.sousChefName !== undefined) ||
				(selection.eyeShape?.trim() !== '' &&
					selection.eyeShape !== undefined) ||
				(selection.color?.trim() !== '' && selection.color !== undefined) ||
				(selection.personality?.trim() !== '' &&
					selection.personality !== undefined)
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
					selectedSpecies={selection.companion}
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
					initialData={selection} 
					onUpdate={(petData) =>
						setSelection((prev) => ({ ...prev, ...petData }))
					}
				/>
			),
		},
		{
			id: 2,
			component: (
				<StartingChef
					onUpdate={(sousChefData) =>
						setSelection((prev) => ({ ...prev, ...sousChefData }))
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
					className={`embark-next-btn ${stepValid ? 'continue' : 'skip'}`}
					onClick={() => handleNext(!stepValid)}
					disabled={isSubmitting}>
					<span key={buttonText} className='embark-button-text'>
						{isSubmitting ? 'Personalizing your journey...' : buttonText}
					</span>
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
