import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/ModalProvider';
import { authenticate } from '../redux/session';
import { fetchSession } from '../redux/session';
import Navbar from '../components/Nav';

export default function Layout() {
	const dispatch = useDispatch();
	const location = useLocation();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	return (
		<>
			<ModalProvider>
				{location.pathname !== '/embark' && <Navbar />}
				{isLoaded && <Outlet />}
				<Modal />
			</ModalProvider>
		</>
	);
}
