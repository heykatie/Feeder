import { useAudio } from "../../context/AudioContext";
import './AudioControls.css'

const AudioControls = () => {
	const { isMuted, setIsMuted, volume, setVolume } = useAudio();

	return (
		<div className='audio-controls'>
			<button onClick={() => setIsMuted(!isMuted)}>
				{isMuted ? '🔇' : '🔊'}
			</button>
			<input
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={volume}
				onChange={(e) => setVolume(parseFloat(e.target.value))}
				disabled={isMuted}
			/>
		</div>
	);
};

export default AudioControls;
