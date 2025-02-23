import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/session';

function AvatarButton() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((store) => store.session.user);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		closeMenu();
	};

	return (
		<>
			<button onClick={toggleMenu} aria-label='profile menu'>
				<i className='fas fa-user-circle' />
			</button>
			{showMenu && (
				<ul className={'profile-dropdown'} ref={ulRef}>
					{(
						<>
							<li>{user.username}</li>
							<li>{user.email}</li>
							<li>
								<button onClick={handleLogout}>Log Out</button>
							</li>
						</>
					)}
				</ul>
			)}
		</>
	);
}

export default AvatarButton;
