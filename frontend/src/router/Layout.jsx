import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/ModalProvider';
import { authenticate } from '../redux/session';
// import Navigation from '../components/Nav/Navigation';
import { fetchSession } from '../redux/session';
import Navbar from '../components/Nav/Navbar';

export default function Layout() {
	const dispatch = useDispatch();
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
				{/* <Navigation /> */}
				<Navbar />
				{isLoaded && <Outlet />}
				<Modal />
			</ModalProvider>
		</>
	);
}
