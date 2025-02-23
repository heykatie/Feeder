import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import Sidebar from './Sidebar';
import './Navbar.css';

const Navbar = () => {
	const user = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

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
					<Link to='/' className='logo'>
						<img src='/images/logo.png' alt='SousChef Logo' />
						<span> SousChef </span>
					</Link>
				</div>

				<div className='navbar-center'>
					<input type='text' placeholder='Search' className='search-bar' />
					<button aria-label='search-btn' className='search-btn'>
						<i className='fas fa-search'></i>
					</button>
				</div>

				<div className='navbar-right'>
					{user ? <ProfileButton /> : <Link to='/login'>Log in</Link>}
				</div>
			</nav>

			{/* Sidebar Component */}
			<Sidebar showMenu={showMenu} toggleMenu={toggleMenu} />
		</>
	);
};

export default Navbar;
