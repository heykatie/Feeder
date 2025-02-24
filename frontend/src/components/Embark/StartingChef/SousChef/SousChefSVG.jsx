const SousChefSVG = ({ eyeShape }) => {
	return (
		<svg viewBox='0 0 200 200' width='150'>
			{/* Face */}
			<circle cx='100' cy='100' r='50' fill='yellow' />

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
		</svg>
	);
};

export default SousChefSVG;
