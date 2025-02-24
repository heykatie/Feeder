const SousChefSVG = ({
	eyeShape,
	color = 'yellow',
	personality = 'Playful',
	small = false,
}) => {
	const size = small ? 50 : 150; // Adjust size for preview thumbnails

	// Define mouth expressions based on personality
	const mouthPaths = {
		Playful: 'M85,110 Q100,135 115,110', // Open smile 😀
		Serious: 'M85,110 L115,110', // Straight line 😐
		Mischievous: 'M85,110 Q100,120 115,110', // Smirk 😏
		Calm: 'M85,110 Q100,125 115,110', // Soft smile 🙂
	};

	return (
		<svg viewBox='0 0 200 200' width={size}>
			{/* Head Shape (Blob instead of perfect circle) */}
			<path
				d='M60,110 C30,60 100,20 140,50 C170,80 150,140 100,150 C50,140 30,120 60,110 Z'
				fill={color}
			/>

			{/* Eyes */}
			{eyeShape === 'cute' && (
				<>
					<circle cx='80' cy='90' r='5' fill='black' />
					<circle cx='120' cy='90' r='5' fill='black' />
				</>
			)}
			{eyeShape === 'serious' && (
				<>
					<rect x='75' y='85' width='10' height='5' fill='black' />
					<rect x='115' y='85' width='10' height='5' fill='black' />
				</>
			)}
			{eyeShape === 'glowing' && (
				<>
					<circle cx='80' cy='90' r='5' fill='blue' filter='url(#glow)' />
					<circle cx='120' cy='90' r='5' fill='blue' filter='url(#glow)' />
					<defs>
						<filter id='glow'>
							<feGaussianBlur stdDeviation='3' result='coloredBlur' />
							<feMerge>
								<feMergeNode in='coloredBlur' />
								<feMergeNode in='SourceGraphic' />
							</feMerge>
						</filter>
					</defs>
				</>
			)}

			{/* Mouth - Dynamic based on personality */}
			<path
				d={mouthPaths[personality]}
				stroke='black'
				strokeWidth='3'
				fill='none'
			/>

			{/* Floating Chef Hat */}
			<path
				d='M70,50 Q80,20 120,30 Q140,10 150,50 Z'
				fill='white'
				stroke='black'
			/>
		</svg>
	);
};

export default SousChefSVG;
