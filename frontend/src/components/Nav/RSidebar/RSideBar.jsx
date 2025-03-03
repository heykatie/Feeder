import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/session';
import './RSideBar.css';

const RSidebar = ({ showSidebar, toggleSidebar }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const rsidebarRef = useRef();
	const user = useSelector((state) => state.session.user);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		toggleSidebar(false);
		navigate('/')
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
			<button
				aria-label='Collapse Sidebar'
				className='close-btn'
				onClick={toggleSidebar}>
				✖{/* <i className='fa-solid fa-xmark'></i> */}
			</button>
			{user && (
				<div className='sidebar-header'>
					<img
						src={user.avatarUrl}
						alt='User Avatar'
						className='user-avatar'
					/>
					<span className='username'>{user.username}</span>
				</div>
			)}
			<ul className='rsidebar-links'>
				<li>
					<NavLink
						className='rsidebar-navLink'
						onClick={toggleSidebar}
						to='/dash'>
						<i className='fas fa-user'></i>
						<span className='text'>Dashboard</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className='rsidebar-navLink'
						onClick={toggleSidebar}
						to='/pets'>
						<i className='fas fa-paw'></i>
						<span className='text'>My Pets</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className='rsidebar-navLink future-feature'
						onClick={toggleSidebar}
						to='/achievements'>
						<i className='fas fa-trophy'></i>
						<span className='text'>Achievements</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className='rsidebar-navLink future-feature '
						onClick={toggleSidebar}
						to='/leaderboards'>
						<i className='fas fa-chart-line'></i>
						<span className='text'>Leaderboards</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className='rsidebar-navLink future-feature '
						onClick={toggleSidebar}
						to='/settings'>
						<i className='fas fa-cog'></i>
						<span className='text'>Settings</span>
					</NavLink>
				</li>
				<li>
					<button onClick={handleLogout}>Log Out</button>
				</li>
			</ul>
		</div>
	);
};

export default RSidebar;
