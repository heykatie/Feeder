import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/ModalProvider';
import { restoreSession } from '../redux/session';
import { ToastContainer } from 'react-toastify';
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

	return (
		<>
			<ModalProvider>
				{location.pathname !== '/embark' && <Navbar />}
				<div className='main-content'>{isLoaded && <Outlet />}</div>
				<Modal />
				{location.pathname !== '/embark' && <Footer />}
			</ModalProvider>
			<ToastContainer />
		</>
	);
}
