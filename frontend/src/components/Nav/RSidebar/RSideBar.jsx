import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {logout} from '../../../redux/session';
import './RSidebar.css';

const RSidebar = ({ showSidebar, toggleSidebar }) => {
	const dispatch = useDispatch();
	const rsidebarRef = useRef();
	const user = useSelector((state) => state.session.user);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		toggleSidebar(false);
	};


	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				toggleSidebar();
			}
		};

		const handleClickOutside = (e) => {
			const avatarButton = document.querySelector('.navbar-right');

			if (avatarButton && avatarButton.contains(e.target)) {
				return;
			}
			if (rsidebarRef.current && !rsidebarRef.current.contains(e.target)) {
				toggleSidebar(false);
			}
		};

		if (showSidebar) {
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);}
	}, [showSidebar, toggleSidebar]);


	return (
		<div
			className={`right-sidebar ${showSidebar ? 'open' : ''}`}
			ref={rsidebarRef}>
			<div className='sidebar-header'>
				<img
					src={user.avatarUrl}
					alt='User Avatar'
					className='user-avatar'
				/>
				<span className='username'>{user.username}</span>
			</div>
			<ul className='sidebar-links'>
				<li>
					<NavLink onClick={toggleSidebar} to='/profile'>
						<i className='fas fa-user'></i> Profile
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleSidebar} to='/pets'>
						<i className='fas fa-paw'></i> Pets
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleSidebar} to='/achievements'>
						<i className='fas fa-trophy'></i> Achievements
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleSidebar} to='/leaderboards'>
						<i className='fas fa-chart-line'></i> Leaderboards
					</NavLink>
				</li>
				<li>
					<NavLink onClick={toggleSidebar} to='/settings'>
						<i className='fas fa-cog'></i> Settings
					</NavLink>
				</li>
				<li>
					<button onClick={handleLogout}>
						Log Out
					</button>
				</li>
			</ul>
		</div>
	);
};

export default RSidebar;
