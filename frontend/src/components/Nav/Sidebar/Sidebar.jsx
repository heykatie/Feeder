import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {useEffect, useRef} from 'react';
import './Sidebar.css';

export default function Sidebar({ isExpanded, toggleExpand }) {
	const userId = useSelector((state) => state.session.user?.id);
	const sidebarRef = useRef(null);

  useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				toggleExpand();
			}
		};

		const handleClickOutside = (e) => {
			const menuButton = document.querySelector('.navbar-menu-btn');

			if (menuButton && menuButton.contains(e.target)) {
				return;
			}

			if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
				toggleExpand();
			}
		};

		if (isExpanded) {
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', handleClickOutside);
		};
  }, [isExpanded, toggleExpand]);


	return (
		<div
			className={`sidebar-panel ${isExpanded ? 'expanded' : ''}`}
			ref={sidebarRef}>
			<button
				aria-label='Collapse Sidebar'
				className='close-btn'
				onClick={toggleExpand}>
				✖{/* <i className='fa-solid fa-xmark'></i> */}
			</button>
			<div className='sidebar-header'>
				<NavLink to='/'>
					<img
						src='/images/assets/logo.png'
						className='logo'
						alt='SousChef Logo'
					/>
				</NavLink>
			</div>
			<ul className='sidebar-links'>
				<li>
					<NavLink
						to='/dash'
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-house'></i>{' '}
						<span className='text'>Home</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/recipes'
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-book'></i>{' '}
						<span className='text'>Explore Recipes</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/favorites'
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-heart'></i>{' '}
						<span className='text'>My Favorites</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/recipes/new'
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-pen'></i>{' '}
						<span className='text'>Post a Recipe</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/${userId}/recipes`}
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-bookmark'></i>{' '}
						<span className='text'>My Recipes</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/lists'
						onClick={toggleExpand}
						className='sidebar-navLink'>
						<i className='fa-solid fa-list'></i>{' '}
						<span className='text'>Lists</span>
					</NavLink>
				</li>
			</ul>
		</div>
	);
}
