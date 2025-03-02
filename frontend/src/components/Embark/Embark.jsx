import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AboutPet from './AboutPet';
import ChooseSpecies from './ChooseSpecies';
import Signup from './Signup/Signup';
import StartingChef from './StartingChef';
import ConfirmExit from '../modals/ConfirmExit';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/users';
import { createPet } from '../../redux/pets';
import { updateSousChef } from '../../redux/souschefs';
import './Embark.css';

const Embark = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [step, setStep] = useState(0);
	const sousChef = useSelector((state) => state.sousChefs.sousChef);
	// const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState({});
	const [stepValid, setStepValid] = useState(false);
	const [showExitModal, setShowExitModal] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [prevStepValid, setPrevStepValid] = useState(false);
	const [buttonText, setButtonText] = useState('Skip →');

	const [selection, setSelection] = useState({
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
		species: '',
	});

	const handleNext = async (skip = false) => {
		if (!skip && !stepValid) return;

		if (step === 0 && !selection.species) {
			setStep(2);
		} else if (step < forms.length - 1) {
			setStep((prev) => prev + 1);
		} else {
			await handleSubmit();
		}
	};

	const handleBack = useCallback(() => {
		if (step === 2 && !selection.species) {
			setStep(0);
		} else if (step > 0) {
			setStep((prev) => prev - 1);
		}
	}, [step, selection.species]);

	const handleExit = useCallback(() => {
		setShowExitModal(true);
	}, []);

	const handleSubmit = async (e) => {
		if (e?.preventDefault) e.preventDefault();
		if (isSubmitting) return;
		setIsSubmitting(true);

		try {
			const userResponse = await dispatch(
				signup({
					username: selection.username,
					email: selection.email,
					password: selection.password,
				})
			);

			if (!userResponse.payload) {
				throw new Error('User creation failed');
			}

			if (userResponse.error) {
				setErrors(
					userResponse.payload.errors ||
						userResponse.payload.message || {
							message: 'Signup failed3. Please try again.',
						}
				);
				return;
			}

			const userId = userResponse?.payload?.id;
			const sousChefId = userResponse?.payload.SousChef?.id || sousChef?.id;

			if (selection.species) {
				await dispatch(
					createPet({
						userId,
						name: selection.name,
						species: selection.species,
						breed: selection.breed,
						age: selection.age,
						weight: selection.weight,
						birthday: selection.birthday,
						allergies: selection.allergies,
						notes: selection.notes,
						image: selection.image,
					})
				);
			}

			const sousChefUpdates = {};
			if (selection.sousChefName)
				sousChefUpdates.name = selection.sousChefName;
			if (selection.eyeShape) sousChefUpdates.eyeShape = selection.eyeShape;
			if (selection.color) sousChefUpdates.color = selection.color;
			if (selection.personality)
				sousChefUpdates.personality = selection.personality;

			if (Object.keys(sousChefUpdates).length > 0 && sousChefId) {
				await dispatch(
					updateSousChef({ sousChefId, sousChefData: sousChefUpdates })
				);
			}
			navigate('/dash');
		} catch (error) {
			alert(`Something went wrong! ${error.message || 'Please try again.'}`);
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
			} else if (e.key === 'Enter' && stepValid) {
				handleNext();
			} else if (e.key === ' ') {
				if (
					activeElement &&
					(activeElement.tagName === 'BUTTON' ||
						activeElement.tagName === 'INPUT')
				) {
					activeElement.click();
				} else if (!stepValid && step !== 3) {
					handleNext(true);
				}
			} else if (e.key === 'Backspace' && !isInputField) {
				handleBack();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleNext, handleBack, step, stepValid]);

		useEffect(() => {
			if (stepValid !== prevStepValid || step === forms.length - 1) {
				const newText =
					step === forms.length - 1
						? 'Level up now'
						: stepValid
						? 'Continue →'
						: 'Skip →';

				setButtonText(newText);

				if (newText === 'Continue →' || newText === 'Level up now') {
					const btn = document.querySelector('.embark-next-btn.continue');
					if (btn) {
						btn.classList.remove('animate');
						void btn.offsetWidth;
						btn.classList.add('animate');
					}
				}

				setPrevStepValid(stepValid);
			}
		}, [stepValid, prevStepValid, step]);

		useEffect(() => {
			setStepValid(isStepValid(step));
		}, [step, selection]);

	const isStepValid = (currentStep) => {
		switch (currentStep) {
			case 0:
				return (
					typeof selection.species === 'string' &&
					selection.species.trim() !== ''
				);
			case 1:
				return Object.values({
					name: selection.name,
					breed: selection.breed,
					age: selection.age,
					weight: selection.weight,
					birthday: selection.birthday,
					allergies: selection.allergies,
					notes: selection.notes,
					image: selection.image,
				}).some((value) => typeof value === 'string' ? value.trim() !== '' : value !== null && value !== undefined);
			case 2:
				return (
					(selection.sousChefName?.trim() !== '' &&
						selection.sousChefName !== undefined) ||
					(selection.eyeShape?.trim() !== '' &&
						selection.eyeShape !== undefined) ||
					(selection.color?.trim() !== '' &&
						selection.color !== undefined) ||
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
					selectedSpecies={selection.species}
					onSelect={(species) =>
						setSelection((prev) => ({ ...prev, species }))
					}
				/>
			),
		},
		{
			id: 1,
			component: (
				<AboutPet
					selectedSpecies={selection.species}
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
					initialData={selection}
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
					handleSubmit={handleSubmit}
					errors={errors}
					initialData={selection}
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
