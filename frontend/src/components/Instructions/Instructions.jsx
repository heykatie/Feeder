import './Instructions.css';

const Instructions = ({ instructions }) => {
	if (!instructions.length) return null;

	return (
		<div className='instruction-preview'>
			<h3>Instructions Preview</h3>
			<ol>
				{instructions.map((step, index) => (
					<li key={index} className='instruction-step-preview'>
						{index+1}. {step}
					</li>
				))}
			</ol>
		</div>
	);
};

export default Instructions;
