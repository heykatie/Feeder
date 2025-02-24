import { useState } from 'react';
import SousChefSVG from './SousChef/SousChefSVG';
import './StartingChef.css';

const eyeShapes = ['cute', 'serious', 'glowing'];

const StartingChef = ({ onNext, onBack }) => {
	const [name, setName] = useState('');
	const [eyeShape, setEyeShape] = useState('cute');
	const [color, setColor] = useState('#ffcc00'); // Default color

	const handleContinue = () => {
		if (!name.trim()) return;
		onNext({
			name,
			type: 'Starter Spoon', // Default starting type
			level: 1,
			xp: 0,
			evoStage: 'Foraging Fledgling',
			eyeShape, // ✅ Send selected eye shape
			color, // ✅ Custom color
		});
	};

	return (
		<div className='starting-chef-container'>
			<h2>Customize Your SousChef</h2>

			{/* SousChef Preview */}
			<div className='souschef-preview' style={{ borderColor: color }}>
				<SousChefSVG eyeShape={eyeShape} />
			</div>

			{/* Name Input */}
			<input
				type='text'
				placeholder="SousChef's Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			{/* Eye Shape Selection */}
			<div className='eye-shape-selector'>
				<label>Eye Shape:</label>
				{eyeShapes.map((shape) => (
					<button
						key={shape}
						className={eyeShape === shape ? 'selected' : ''}
						onClick={() => setEyeShape(shape)}>
						{shape}
					</button>
				))}
			</div>

			{/* Color Picker */}
			<div className='color-picker'>
				<label>Pick a color:</label>
				<input
					type='color'
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>

		</div>
	);
};

export default StartingChef;
