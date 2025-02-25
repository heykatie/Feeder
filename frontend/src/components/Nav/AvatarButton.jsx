import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/session';
import RSidebar from './RSidebar';

function AvatarButton() {
	const dispatch = useDispatch();
	const [showSidebar, setShowSidebar] = useState(false);
	const user = useSelector((store) => store.session.user);
	const ulRef = useRef();

	const toggleSidebar = (e) => {e.stopPropagation();setShowSidebar(!showSidebar)};

	useEffect(() => {
		if (!showSidebar) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowSidebar(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showSidebar]);

	const closeMenu = () => setShowSidebar(false);

	return (
		<>
			<button onClick={toggleSidebar} aria-label='profile menu'>
				<i className='fas fa-user-circle' />
			</button>

			<RSidebar
				showSidebar={showSidebar}
				toggleSidebar={setShowSidebar}
			/>
		</>
	);
}

export default AvatarButton;
