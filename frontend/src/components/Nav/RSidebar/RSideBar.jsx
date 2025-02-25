import { useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {logout} from '../../../redux/session';
import './RSidebar.css';

const RSidebar = ({ showSidebar, toggleSidebar }) => {
	const dispatch = useDispatch();
	const sidebarRef = useRef();
	const user = useSelector((state) => state.session.user);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		toggleSidebar(false);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				toggleSidebar(false);
			}
		};

		if (showSidebar) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [showSidebar, toggleSidebar]);


	return (
		<div
			className={`right-sidebar ${showSidebar ? 'open' : ''}`}
			ref={sidebarRef}>
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
					<NavLink to='/profile'>
						<i className='fas fa-user'></i> Profile
					</NavLink>
				</li>
				<li>
					<NavLink to='/pets'>
						<i className='fas fa-paw'></i> Pets
					</NavLink>
				</li>
				<li>
					<NavLink to='/achievements'>
						<i className='fas fa-trophy'></i> Achievements
					</NavLink>
				</li>
				<li>
					<NavLink to='/leaderboards'>
						<i className='fas fa-chart-line'></i> Leaderboards
					</NavLink>
				</li>
				<li>
					<NavLink to='/settings'>
						<i className='fas fa-cog'></i> Settings
					</NavLink>
				</li>
				<li>
					<button
						onClick={(event) => {
							{
								handleLogout;
							}
						}}>
						Log Out
					</button>
				</li>
			</ul>
		</div>
	);
};

export default RSidebar;
