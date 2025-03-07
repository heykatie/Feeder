import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal/ModalProvider';
import { restoreSession } from '../redux/session';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import './toast.css';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';
import { useAudio } from '../context/AudioContext';
import AudioControls from '../components/AudioControls';
import Loading from '../components/Loading/';
import '../index.css';

export default function Layout() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(true);
	const { setCurrentMusic } = useAudio();
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const restore = async () => {
	// 		try {
	// 			await dispatch(restoreSession()).unwrap();
	// 		} catch (error) {
	// 			console.error('Session restore failed:', error);
	// 		} finally {
	// 			setIsLoaded(true); // Ensure the page always loads
	// 		}
	// 	};
	// 	restore();
	// }, [dispatch]);

	useEffect(() => {
		dispatch(restoreSession()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			const toastContainer = document.querySelector(
				'.Toastify__toast-container'
			);
			if (toastContainer && !toastContainer.contains(event.target)) {
				toast.dismiss();
			}
		};

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				toast.dismiss();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get('loggedIn') === 'true') {
			window.location.replace('/dash');
		}
	}, []);


	useEffect(() => {
		if (!setCurrentMusic) {
			console.error('Audio context is not initialized');
			return;
		}

		const musicPaths = {
			'/recipes': '/audio/lofi/honey-chill-lofi-309227.mp3',
			'/dash': '/audio/lofi/chill-lofi-music-interior-lounge-256260.mp3',
			default: '/audio/lofi/lofi-chill-jazz-272869.mp3',
		};

		const matchedPath = Object.keys(musicPaths).find((path) =>
			location.pathname.includes(path)
		);
		const selectedMusic = matchedPath ? musicPaths[matchedPath] : musicPaths.default;
		console.log(`Setting background music: ${selectedMusic}`);
		setCurrentMusic(selectedMusic);
	}, [location.pathname, setCurrentMusic]);

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={4500}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={true}
				closeOnEscape={true}
				delay={30000}
			/>
			<ModalProvider>
				{location.pathname !== '/embark' && <Navbar />}
				<div className='main-content'>
					{loading ? <Loading /> : isLoaded && <Outlet />}
				</div>
				<AudioControls />
				<Modal />
				{location.pathname !== '/embark' && <Footer />}
			</ModalProvider>
		</>
	);
}
