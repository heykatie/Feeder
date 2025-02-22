import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ModalProvider, Modal } from '../context/ModalProvider';
import { authenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';
import {fetchSession} from '../redux/session'

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
				<Navigation />
				{isLoaded && <Outlet />}
				<Modal />
			</ModalProvider>
		</>
	);
}
