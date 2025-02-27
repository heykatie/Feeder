import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
	const user = useSelector((state) => state.session.user);
	const isLoading = useSelector((state) => state.session.isLoading);

	useEffect(() => {
		if (!user && !isLoading) {
			toast.error(
				'This page is protected. Please log in or sign up to continue.',
				{
					position: 'top-center',
					autoClose: 3000,
				}
			);
		}
	}, [user, isLoading]);

	if (isLoading) return <div className='loading-screen'>Loading...</div>;

	return user ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
