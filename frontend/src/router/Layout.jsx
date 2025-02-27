import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/ModalProvider';
import { restoreSession } from '../redux/session';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import './toast.css';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

export default function Layout() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(restoreSession()).then(() => setIsLoaded(true));
	}, [dispatch]);

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

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={4500}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={true}
				closeOnEscape={true}
			/>
			<ModalProvider>
				{location.pathname !== '/embark' && <Navbar />}
				<div className='main-content'>{isLoaded && <Outlet />}</div>
				<Modal />
				{location.pathname !== '/embark' && <Footer />}
			</ModalProvider>
		</>
	);
}
