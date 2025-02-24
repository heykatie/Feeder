import { useState } from 'react';
import SousChefSVG from '../../SousChef/SousChefSVG';
import './StartingChef.css';

const eyeShapes = ['cute', 'serious', 'glowing'];
const personalities = [
	{ label: 'Playful', emoji: '🌀' },
	{ label: 'Serious', emoji: '😐' },
	{ label: 'Mischievous', emoji: '😏' },
	{ label: 'Calm', emoji: '🧘' },
];

const StartingChef = ({ onNext, onBack }) => {
	const [name, setName] = useState('');
	const [eyeShape, setEyeShape] = useState('cute');
	const [color, setColor] = useState('#ffcc00'); // Default color
	const [personality, setPersonality] = useState('Playful'); // Default

	const handleContinue = () => {
		if (!name.trim()) return;
		onNext({
			name,
			type: 'Starter Spoon',
			level: 1,
			xp: 0,
			evoStage: 'Foraging Fledgling',
			eyeShape,
			color,
			personality, // ✅ Send personality
		});
	};

	return (
		<div className='starting-chef-container'>
			<h2>Customize Your SousChef</h2>

			{/* SousChef Preview */}
			<div className='souschef-preview' style={{ borderColor: color }}>
				<SousChefSVG
					eyeShape={eyeShape}
					color={color}
					personality={personality}
				/>
			</div>

			{/* Name Input */}
			<input
				type='text'
				placeholder="SousChef's Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			{/* Eye Shape Selection with Preview */}
			<div className='eye-shape-selector'>
				<label>Eye Shape:</label>
				<div className='eye-preview-container'>
					{eyeShapes.map((shape) => (
						<button
							key={shape}
							className={eyeShape === shape ? 'selected' : ''}
							onClick={() => setEyeShape(shape)}>
							<SousChefSVG eyeShape={shape} color={color} small />
						</button>
					))}
				</div>
			</div>

			{/* Personality Selection */}
			<div className='personality-selector'>
				<label>Personality:</label>
				<div className='personality-options'>
					{personalities.map(({ label, emoji }) => (
						<button
							key={label}
							className={personality === label ? 'selected' : ''}
							onClick={() => setPersonality(label)}>
							<span>{emoji}</span> {label}
						</button>
					))}
				</div>
			</div>

			{/* Color Picker */}
			<div className='color-picker'>
				<label>Pick a color:</label>
				<div className='color-input-container'>
					<input
						type='color'
						value={color}
						onChange={(e) => setColor(e.target.value)}
					/>
					<div
						className='color-preview'
						style={{ backgroundColor: color }}></div>
				</div>
			</div>
		</div>
	);
};

export default StartingChef;
