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

const StartingChef = ({ onNext, onBack, onUpdate, initialData }) => {
	const [sousChefName, setSousChefName] = useState(
		initialData.sousChefName || ''
	);
	const [eyeShape, setEyeShape] = useState(initialData.eyeShape || 'cute');
	const [color, setColor] = useState(initialData.color || '#ffcc00');
	const [personality, setPersonality] = useState(
		initialData.personality || 'Playful'
	);

	const updateSelection = (field, value) => {
		if (field === 'sousChefName') setSousChefName(value);
		if (field === 'eyeShape') setEyeShape(value);
		if (field === 'color') setColor(value);
		if (field === 'personality') setPersonality(value);

		onUpdate({
			sousChefName: field === 'sousChefName' ? value : sousChefName,
			eyeShape: field === 'eyeShape' ? value : eyeShape,
			color: field === 'color' ? value : color,
			personality: field === 'personality' ? value : personality,
		});
	};

	const handleContinue = () => {
		if (!sousChefName.trim()) return;
		onNext({
			name: sousChefName,
			type: 'Starter Spoon',
			level: 1,
			xp: 0,
			evoStage: 'Foraging Fledgling',
			eyeShape,
			color,
			personality,
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
				value={sousChefName}
				onChange={(e) => updateSelection('sousChefName', e.target.value)}
			/>

			{/* Eye Shape Selection */}
			<div className='eye-shape-selector'>
				<label>Eye Shape:</label>
				<div className='eye-preview-container'>
					{eyeShapes.map((shape) => (
						<button
							key={shape}
							className={eyeShape === shape ? 'selected' : ''}
							onClick={(e) => updateSelection('eyeShape', shape)}>
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
							onClick={(e) => updateSelection('personality', label)}>
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
						onChange={(e) => updateSelection('color', e.target.value)}
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