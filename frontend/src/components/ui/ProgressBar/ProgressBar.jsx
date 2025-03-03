export default function ProgressBar({ value }) {
	return (
		<div className='relative w-full h-2 bg-gray-700 rounded overflow-hidden'>
			<div
				className='h-full bg-[#FFD166] transition-all'
				style={{ width: `${value}%` }}></div>
		</div>
	);
}
