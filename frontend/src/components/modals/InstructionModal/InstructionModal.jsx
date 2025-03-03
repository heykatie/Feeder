import { useState } from 'react';
import { useModal } from '../../../context/ModalContext';
import {FaTrash} from 'react-icons/fa';
import './InstructionModal.css';

const InstructionModal = ({ instructions, setInstructions }) => {
	const { closeModal } = useModal();

	const [newInstructions, setNewInstructions] = useState(
		instructions.length > 0 ? [...instructions] : ['']
	);

	const handleInstructionChange = (index, value) => {
		const updatedInstructions = [...newInstructions];
		updatedInstructions[index] = value;
		setNewInstructions(updatedInstructions);
	};

	const handleAddStep = () => {
		setNewInstructions([...newInstructions, '']);
	};

	const handleSave = () => {
		setInstructions(newInstructions.filter((step) => step.trim() !== ''));
		closeModal();
	};

	const handleDeleteStep = (indexToDelete) => {
		setNewInstructions((prevInstructions) =>
			prevInstructions.filter((_, index) => index !== indexToDelete)
		);
	};

	return (
		<div className='instruction-modal'>
			<h2>Add Instructions</h2>

			<div className='instruction-list'>
				{newInstructions.map((step, index) => (
					<div key={index} className='instruction-step'>
						<span className='step-number'>{index + 1}.</span>
						<input
							type='text'
							className='instruction-modal-input'
							value={step}
							onChange={(e) =>
								handleInstructionChange(index, e.target.value)
							}
							placeholder={`Step ${index + 1}`}
							required
						/>
						<button
							className='delete-step-btn'
							onClick={() => handleDeleteStep(index)}
							aria-label='Delete Step'>
							<FaTrash />
						</button>
					</div>
				))}
			</div>

			<button className='add-step-btn' onClick={handleAddStep}>
				+ Add Step
			</button>

			<div className='instruction-modal-actions'>
				<button className='save-btn' onClick={handleSave}>
					Save Instructions
				</button>
				<button className='instruction-cancel-btn' onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default InstructionModal;
