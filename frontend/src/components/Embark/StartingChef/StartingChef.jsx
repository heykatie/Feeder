import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SousChefSVG from '../../SousChef/SousChefSVG';
import './StartingChef.css';

const eyeShapes = ['cute', 'serious', 'glowing'];
const personalities = [
	{ label: 'Playful', emoji: '🌀' },
	{ label: 'Serious', emoji: '😐' },
	{ label: 'Mischievous', emoji: '😏' },
	{ label: 'Calm', emoji: '🧘' },
];

const StartingChef = ({ onUpdate, initialData }) => {
	const [sousChefName, setSousChefName] = useState(
		initialData?.sousChefName || ''
	);
	const [eyeShape, setEyeShape] = useState(initialData?.eyeShape || 'cute');
	const [color, setColor] = useState(initialData?.color || '#ffcc00');
	const [personality, setPersonality] = useState(
		initialData?.personality || 'Playful'
	);

	const nameInputRef = useRef(null);
	const sections = useMemo(
		() => ['sousChefName', 'eyeShape', 'personality', 'color'],
		[]
	);
	const [selectedSection, setSelectedSection] = useState(0);

	const updateSelection = useCallback(
		(field, value) => {
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
		},
		[onUpdate, sousChefName, eyeShape, color, personality]
	);

	const handleKeyDown = useCallback(
		(e) => {
			if (
				document.activeElement.tagName === 'INPUT' &&
				e.key !== 'ArrowUp' &&
				e.key !== 'ArrowDown'
			)
				return;

			if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				e.preventDefault();
				let newIndex =
					e.key === 'ArrowUp'
						? (selectedSection - 1 + sections.length) % sections.length
						: (selectedSection + 1) % sections.length;

				setSelectedSection(newIndex);

				setTimeout(() => {
					if (
						sections[newIndex] === 'sousChefName' &&
						nameInputRef.current
					) {
						nameInputRef.current.focus();
					} else if (sections[newIndex] === 'eyeShape') {
						document
							.querySelector('[data-type="eyeShape"].selected')
							?.focus();
					} else if (sections[newIndex] === 'personality') {
						document
							.querySelector('[data-type="personality"].selected')
							?.focus();
					} else if (sections[newIndex] === 'color') {
						document.querySelector('input[type="color"]')?.focus();
					}
				}, 10);
			}

			if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				e.preventDefault();
				if (sections[selectedSection] === 'eyeShape') {
					const currentIndex = eyeShapes.indexOf(eyeShape);
					const newIndex =
						e.key === 'ArrowRight'
							? (currentIndex + 1) % eyeShapes.length
							: (currentIndex - 1 + eyeShapes.length) % eyeShapes.length;
					updateSelection('eyeShape', eyeShapes[newIndex]);
				} else if (sections[selectedSection] === 'personality') {
					const currentIndex = personalities.findIndex(
						(p) => p.label === personality
					);
					const newIndex =
						e.key === 'ArrowRight'
							? (currentIndex + 1) % personalities.length
							: (currentIndex - 1 + personalities.length) %
							personalities.length;
					updateSelection('personality', personalities[newIndex].label);
				}
			}
		},
		[selectedSection, eyeShape, personality, sections, updateSelection]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]); // ✅ Now `useEffect` correctly depends on `handleKeyDown`

	return (
		<div className='starting-chef-container'>
			<h2>Customize Your SousChef</h2>

			<div className='souschef-preview' style={{ borderColor: color }}>
				<SousChefSVG
					eyeShape={eyeShape}
					color={color}
					personality={personality}
				/>
			</div>

			<input
				type='text'
				ref={nameInputRef}
				className={!sousChefName ? 'empty' : ''}
				placeholder='Name your SousChef'
				value={sousChefName}
				onChange={(e) => updateSelection('sousChefName', e.target.value)}
			/>

			<div className='eye-shape-selector'>
				<label>Eye Shape:</label>
				<div className='eye-preview-container'>
					{eyeShapes.map((shape) => (
						<button
							key={shape}
							className={eyeShape === shape ? 'selected' : ''}
							data-type='eyeShape'
							tabIndex='0'
							onClick={() => updateSelection('eyeShape', shape)}>
							<SousChefSVG eyeShape={shape} color={color} small />
						</button>
					))}
				</div>
			</div>

			<div className='personality-selector'>
				<label>Personality:</label>
				<div className='personality-options'>
					{personalities.map(({ label, emoji }) => (
						<button
							key={label}
							className={personality === label ? 'selected' : ''}
							data-type='personality'
							tabIndex='0'
							onClick={() => updateSelection('personality', label)}>
							<span>{emoji}</span> {label}
						</button>
					))}
				</div>
			</div>

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
