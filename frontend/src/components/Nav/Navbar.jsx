import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import AvatarButton from './AvatarButton';
import Sidebar from './Sidebar';
import OpenModalMenuItem from '../Modals/OpenModalMenuItem';
import LoginModal from '../Modals/LoginModal';
import './Navbar.css';

const Navbar = () => {
	const ulRef = useRef();
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);
	const closeMenu = () => setShowMenu(false);

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

	return (
		<>
			<nav className='top-navbar'>
				<div className='navbar-left'>
					<button
						aria-label='navbar-menu-btn'
						className='navbar-menu-btn'
						onClick={toggleMenu}>
						<i className='fa-solid fa-bars'></i>
					</button>
					<NavLink to='/' className='logo'>
						<img src='/images/logo.png' alt='SousChef Logo' />
						<span> SousChef </span>
					</NavLink>
				</div>

				<div className='navbar-center'>
					<input type='text' placeholder='Search' className='search-bar' />
					<button aria-label='search-btn' className='search-btn'>
						<i className='fas fa-search'></i>
					</button>
				</div>

				<div className='navbar-right'>
					{user ? (
						<AvatarButton />
					) : (
						<OpenModalMenuItem
							itemText='Log In'
							onItemClick={closeMenu}
							modalComponent={<LoginModal />}
						/>
					)}
				</div>
			</nav>

			<Sidebar showMenu={showMenu} toggleMenu={toggleMenu} />
		</>
	);
};

export default Navbar;
