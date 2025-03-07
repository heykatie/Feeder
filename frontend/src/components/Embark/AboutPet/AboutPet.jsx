import { useState } from 'react';
import { useModal } from '../../../context/Modal/ModalContext';
import { useSelector, useDispatch } from 'react-redux';
import { getUploadUrl, uploadFileToS3 } from '../../../redux/files';
import './AboutPet.css';

const AboutPet = ({
	onUpdate,
	selectedSpecies,
	initialData = null,
	mode = 'onboarding',
}) => {
	const isEditMode = mode === 'edit';
	const isOnboarding = mode === 'onboarding';
	const isAddMode = mode === 'add';
	const { error } = useSelector((state) => state.pets);
	const { closeModal } = useModal();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState(() => ({
		id: initialData?.id || '',
		name: initialData?.name || '',
		species: selectedSpecies || initialData?.species || '',
		breed: initialData?.breed || '',
		age: initialData?.age || '',
		weight: initialData?.weight || '',
		allergies: initialData?.allergies || '',
		notes: initialData?.notes || '',
		image: initialData?.image || '',
		birthday:
			initialData?.birthday &&
			!isNaN(new Date(initialData.birthday).getTime())
				? new Date(initialData.birthday).toISOString().split('T')[0]
				: '',
	}));

	const handleChange = (e) => {
		const { name, value } = e.target;
		let updatedValue = value;

		if (name === 'birthday' && value) {
			const date = new Date(value);
			updatedValue = !isNaN(date.getTime())
				? date.toISOString().split('T')[0]
				: '';
		}

		setFormData((prev) => ({ ...prev, [name]: updatedValue }));

		if (isOnboarding) {
			onUpdate({ [name]: updatedValue });
		}
	};

	// const handleFileChange = (e) => {
	// 	const file = e.target.files[0];
	// 	if (file) {
	// 		const imageUrl = URL.createObjectURL(file);
	// 		setFormData((prev) => ({ ...prev, image: imageUrl }));
	// 		onUpdate({ image: imageUrl, file });
	// 	}
	// };

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			// Step 1: Request a signed URL from the backend using Redux
			const { payload: result } = await dispatch(
				getUploadUrl({
					fileName: file.name,
					fileType: file.type,
					fileSize: file.size,
				})
			);
			console.log('Signed URL response:', result);

			if (!result.url || !result.uniqueKey) {
				throw new Error('Invalid signed URL response');
			}

			// Step 2: Upload the file directly to S3 using Redux
			const { payload: uploadResponse } = await dispatch(
				uploadFileToS3({
					url: result.url,
					file,
					uniqueKey: result.uniqueKey,
				})
			);

			if (!uploadResponse) {
				throw new Error('Failed to upload image to S3');
			}

			// Step 3: Generate the full S3 URL using `import.meta.env`
			const s3ImageUrl = `https://${
				import.meta.env.VITE_AWS_BUCKET_NAME
			}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${
				result.uniqueKey
			}`;

			console.log('Uploaded image URL:', s3ImageUrl);

			// Step 4: Store in state
			setFormData((prev) => ({ ...prev, image: s3ImageUrl }));
			onUpdate({ image: s3ImageUrl });
		} catch (error) {
			console.error('S3 Upload Error:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await onUpdate(formData);
		closeModal();
	};

	return (
		<div
			className={`about-pet-container ${
				isEditMode ? 'edit-mode' : isAddMode ? 'add-mode' : ''
			}`}>
			<div className='about-pet-form'>
				<h2>
					{isEditMode
						? 'Edit Pet Details'
						: isAddMode
						? 'Add a New Pet'
						: `Tell us about your ${formData.species || 'baby'}`}
				</h2>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='name'
						placeholder='Name'
						value={formData.name}
						onChange={handleChange}
					/>

					{isAddMode && (
						<select
							name='species'
							value={formData.species}
							onChange={handleChange}
							required>
							<option value=''>Select Species*</option>
							<option value='dog'>Dog</option>
							<option value='cat'>Cat</option>
						</select>
					)}

					<input
						type='text'
						name='breed'
						placeholder='Breed'
						value={formData.breed}
						onChange={handleChange}
					/>
					<input
						type='number'
						name='age'
						placeholder='Age'
						value={formData.age}
						onChange={handleChange}
						min='0'
					/>
					<input
						type='number'
						name='weight'
						placeholder='Weight (lbs)'
						value={formData.weight}
						onChange={handleChange}
						step='0.1'
						min='0'
					/>
					<input
						type='date'
						name='birthday'
						value={formData.birthday}
						onChange={handleChange}
						// max={new Date().toISOString().split('T')[0]}
					/>
					<textarea
						name='allergies'
						placeholder='Any allergies?'
						value={formData.allergies}
						onChange={handleChange}></textarea>
					<textarea
						name='notes'
						placeholder='Additional notes'
						value={formData.notes}
						onChange={handleChange}></textarea>

					<div className='file-upload-container'>
						<input
							type='file'
							accept='image/*'
							onChange={handleFileChange}
						/>
					</div>

					{(isEditMode || isAddMode) && (
						<button type='submit' className='save-btn'>
							{isEditMode ? 'Save Changes' : 'Add Pet'}
						</button>
					)}
				</form>
				{error && error.message}
			</div>

			{formData.image && (
				<div className='image-preview-container'>
					<img src={formData.image} alt='Pet' className='preview-image' />
				</div>
			)}
		</div>
	);
};

export default AboutPet;
