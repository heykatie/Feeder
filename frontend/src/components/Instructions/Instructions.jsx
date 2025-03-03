import { FaTrash } from 'react-icons/fa';
import './Instructions.css';

const Instructions = ({ instructions, setInstructions }) => {
	if (!instructions.length) return null;

	const handleDeleteInstruction = (indexToDelete) => {
		setInstructions((prevInstructions) => {
			return [
				...prevInstructions.slice(0, indexToDelete),
				...prevInstructions.slice(indexToDelete + 1),
			];
		});
	};

	// const handleDeleteInstruction = (indexToDelete) => {
	// 	setInstructions((prevInstructions) =>
	// 		prevInstructions.filter((_, index) => index !== indexToDelete)
	// 	);
	// };

	return (
		<div className='instruction-preview'>
			<h3>Instructions Preview</h3>
			<ol>
				{instructions.map((step, index) => (
					<li key={index} className='instruction-step-preview'>
						{index + 1}. {step}
						<button
							className='delete-instruction-btn'
							onClick={() => handleDeleteInstruction(index)}
							aria-label='Delete instruction'>
							<FaTrash />
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default Instructions;
