import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {useEffect, useRef} from 'react';
import './Sidebar.css';

export default function Sidebar({ isExpanded, toggleExpand }) {
	const userId = useSelector((state) => state.session.userId);
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
			ref={sidebarRef}
			className={`sidebar-panel ${isExpanded ? 'expanded' : ''}`}>
			<button
				aria-label='Collapse Sidebar'
				className='close-btn'
				onClick={toggleExpand}>
				<i className='fa-solid fa-xmark'></i>
			</button>
			<NavLink
				to='/dash'
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-house'></i>{' '}
				<span className='text'>Home</span>
			</NavLink>
			<NavLink
				to='/recipes'
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-book'></i>{' '}
				<span className='text'>Explore</span>
			</NavLink>
			<NavLink
				to='/favorites'
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-heart'></i>{' '}
				<span className='text'>My Favorites</span>
			</NavLink>
			<NavLink
				to='/recipes/new'
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-pen'></i>{' '}
				<span className='text'>Post a Recipe</span>
			</NavLink>
			<NavLink
				to={`/recipes/${userId}`}
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-bookmark'></i>{' '}
				<span className='text'>My Recipes</span>
			</NavLink>
			<NavLink
				to='/lists'
				onClick={toggleExpand}
				className='sidebar-navLink'>
				<i className='fa-solid fa-list'></i>{' '}
				<span className='text'>Lists</span>
			</NavLink>
		</div>
	);
}
