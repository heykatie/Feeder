import { useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import './AboutPet.css';

const AboutPet = ({ onUpdate, selectedSpecies, initialData, formData, setFormData, mode }) => {
	const { closeModal } = useModal();
	const isEditMode = mode === 'edit';
	const isAddMode = mode === 'add';
	const isOnboarding = mode === 'onboarding';

	/** ✅ Handle Onboarding Mode (Embark.jsx) */
	useEffect(() => {
		if (isOnboarding && selectedSpecies) {
			setFormData((prev) => ({ ...prev, species: selectedSpecies }));
		}
	}, [selectedSpecies, isOnboarding, setFormData]);

	/** ✅ Handle Edit Mode (Pets.jsx) - Load initial pet data */
	useEffect(() => {
		if (isEditMode && initialData) {
			setFormData(initialData); // Only set once to avoid overwriting user edits
		}
	}, [isEditMode, initialData, setFormData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdate(formData);
		if (!isOnboarding) setFormData(null); // ✅ Reset form only in add/edit mode
		closeModal();
	};

	return (
		<div className={`about-pet-container ${isEditMode ? 'edit-mode' : isAddMode ? 'add-mode' : ''}`}>
			<div className='about-pet-form'>
				<h2>
					{isEditMode
						? 'Edit Pet Details'
						: isAddMode
						? 'Add a New Pet'
						: `Tell us about your ${formData?.species || 'baby'}`}
				</h2>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='name'
						placeholder='Name*'
						value={formData?.name || ''}
						onChange={handleChange}
						required
					/>

					{isAddMode && (
						<select name='species' className='species-select' value={formData?.species || ''} onChange={handleChange} required>
							<option value=''>Select Species*</option>
							<option value='dog'>Dog</option>
							<option value='cat'>Cat</option>
						</select>
					)}

					<input type='text' name='breed' placeholder='Breed' value={formData?.breed || ''} onChange={handleChange} />
					<input type='number' name='age' placeholder='Age' value={formData?.age || ''} min='0' onChange={handleChange} />
					<input type='number' name='weight' placeholder='Weight (lbs)' value={formData?.weight || ''} min='0' onChange={handleChange} />
					<input type='date' name='birthday' value={formData?.birthday || ''} onChange={handleChange} />
					<textarea name='allergies' placeholder='Any allergies?' value={formData?.allergies || ''} onChange={handleChange}></textarea>
					<textarea name='notes' placeholder='Additional notes' value={formData?.notes || ''} onChange={handleChange}></textarea>

					<div className='file-upload-container'>
						<input type='file' accept='image/*' onChange={(e) => setFormData((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }))} />
					</div>

					{(isEditMode || isAddMode) && <button type='submit' className='save-btn'>{isEditMode ? 'Save Changes' : 'Add Pet'}</button>}
				</form>
			</div>

			{formData?.image && (
				<div className='image-preview-container'>
					<img src={formData?.image} alt='Pet' className='preview-image' />
				</div>
			)}
		</div>
	);
};

export default AboutPet;