import { useState } from 'react';

const souschefTypes = [
	'Starter Spoon',
	'Whisk Tamer',
	'Chill Conjurer',
	'Broth Whisperer',
	'Flame Forged',
	'Alchemist',
	'Herb Sage',
	'Prime Cut Pro',
	'RawDawg',
	'Gilded Gourmet',
	'Zen Healer',
	'Soothing Angel',
	'Arcane Chef',
	'Wandering Nomad',
	'Cybernetic Saucier',
	'Untamed Flavorist',
	'Dehydrated Hydra',
];

const StartingPack = ({ selectedType, onNext, onBack }) => {
	const [name, setName] = useState('');
	const [souschefType, setSouschefType] = useState('Starter Spoon');

	const handleContinue = () => {
		if (!name.trim()) return;
		onNext({
			name,
			type: souschefType,
			level: 1,
			xp: 0,
			evoStage: 'Foraging Fledgling',
			imageUrl: `/images/souschefs/${souschefType}.png`,
			animationUrl: `/animations/souschefs/${souschefType}.json`,
		});
	};

	return (
		<div className='starting-pack-container'>
			<h2>Customize Your SousChef</h2>
			<div className='souschef-preview'>
				<img
					src={`/images/souschefs/${souschefType}.png`}
					alt={souschefType}
				/>
			</div>

			<input
				type='text'
				placeholder="SousChef's Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<select
				value={souschefType}
				onChange={(e) => setSouschefType(e.target.value)}>
				{souschefTypes.map((type) => (
					<option key={type} value={type}>
						{type}
					</option>
				))}
			</select>

			<div className='buttons'>
				<button className='back' onClick={onBack}>
					← Back
				</button>
				<button
					className='continue'
					onClick={handleContinue}
					disabled={!name.trim()}>
					Continue →
				</button>
			</div>
		</div>
	);
};

export default StartingPack;
