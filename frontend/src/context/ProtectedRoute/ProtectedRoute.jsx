import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
	const user = useSelector((state) => state.session.user);
	const isLoading = useSelector((state) => state.session.isLoading);

	if (isLoading) return <div className='loading-screen'>Loading...</div>;

	return user ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
