import { createContext, useState, useContext, useEffect } from 'react';
import Howler from 'react-howler';
import useSound from 'use-sound';

// Import UI click sounds
import clickSound from '/audio/ui/household_hi_fi_system_play_button_press.mp3';
import levelUpSound from '/audio/ui/zapsplat_animals_bird_ringneck_parakeet_says_fruity_x2_cute_109608.mp3';

// Import background music
import defaultMusic from '/audio/lofi/lofi-chill-jazz-272869.mp3';
// import recipeMusic from '/audio/lofi/honey-chill-lofi-309227.mp3';
// import dashMusic from '/audio/lofi/chill-lofi-music-interior-lounge-256260.mp3';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.15); // Default volume at 50%
	const [currentMusic, setCurrentMusic] = useState(defaultMusic);
	const [isUserInteracted, setIsUserInteracted] = useState(false);

	// UI sound effects
	const [playClick] = useSound(clickSound, { volume: isMuted ? 0 : volume });
	const [playLevelUp] = useSound(levelUpSound, {
		volume: isMuted ? 0 : volume,
	});

	// Allow audio to start only after user interaction
	useEffect(() => {
		const enableAudio = () => setIsUserInteracted(true);
		window.addEventListener('click', enableAudio, { once: true });
		window.addEventListener('keydown', enableAudio, { once: true });

		return () => {
			window.removeEventListener('click', enableAudio);
			window.removeEventListener('keydown', enableAudio);
		};
	}, []);

	return (
		<AudioContext.Provider
			value={{
				isMuted,
				setIsMuted,
				volume,
				setVolume,
				setCurrentMusic,
				playClick,
				playLevelUp,
			}}>
			{/* Play only after user interaction */}
			{isUserInteracted && (
				<Howler
					src={currentMusic}
					playing={!isMuted}
					volume={volume}
					loop
				/>
			)}
			{children}
		</AudioContext.Provider>
	);
};

export const useAudio = () => useContext(AudioContext);