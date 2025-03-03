import {NavLink, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AvatarButton from './AvatarButton';
import Menu from '../Menu';
import Sidebar from '../Sidebar';
import OpenModal from '../../../context/OpenModal';
import LoginModal from '../../modals/LoginModal';
import RSidebar from '../RSidebar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
	const user = useSelector((state) => state.session.user);
	const [isExpanded, setIsExpanded] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const navigate = useNavigate();

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setTimeout(() => setIsHovered(false), 1500);

	const toggleExpand = () => {
		if (!isExpanded) setShowMenu(false);
		setIsExpanded((prev) => !prev);
	};

	const toggleMenu = () => {
		if (isExpanded) setShowMenu(true);
		setShowMenu((prev) => !prev);
	};

	const toggleSidebar = () => {
		setShowSidebar((prev) => !prev);
	};

		const handleSearch = (e) => {
			// console.log('handleSearch fired');
			// console.log('Current searchQuery:', searchQuery);
			e.preventDefault(); 
			if (!searchQuery.trim()) return;
			navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
		};

	// useEffect(() => {
	// 	if (!isExpanded) return;

	// 	const closeMenu = (e) => {
	// 		if (ulRef.current && !ulRef.current.contains(e.target)) {
	// 			setIsExpanded(false);
	// 		}
	// 	};

	// 	document.addEventListener('click', closeMenu);

	// 	return () => document.removeEventListener('click', closeMenu);
	// }, [isExpanded]);

	return (
		<>
			<nav className='top-navbar'>
				<div className='navbar-left'>
					<button
						aria-label='navbar-menu-btn'
						className='navbar-menu-btn'
						onClick={toggleExpand}>
						<i className='fa-solid fa-hamburger'></i>
					</button>
					{user ? (
						<NavLink to='/recipes' className='logo'>
							SousChef
						</NavLink>
					) : (
						<NavLink to='/' className='logo'>
							SousChef
						</NavLink>
					)}
				</div>

				<form className='navbar-center' onSubmit={handleSearch}>
					<input
						type='text'
						placeholder='Search recipes...'
						className='search-bar'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<button
						aria-label='search-btn'
						className='search-btn'
						type='submit'>
						<i className='fas fa-search'></i>
					</button>
				</form>

				<div className='navbar-right'>
					{user ? (
						<AvatarButton
							showSidebar={showSidebar}
							toggleSidebar={toggleSidebar}
						/>
					) : (
						<OpenModal
							itemText='Log In'
							// onItemClick={toggleSidebar}
							modalComponent={<LoginModal />}
						/>
					)}
				</div>
			</nav>

			<button
				className={`expand-arrow ${showMenu ? 'rotated' : ''}`}
				onClick={toggleMenu}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-label='Toggle Sidebar'>
				<i className='fa-solid fa-chevron-right'></i>
			</button>

			<Sidebar isExpanded={isExpanded} toggleExpand={toggleExpand} />
			{(showMenu || isHovered) && (
				<Menu
					showMenu={showMenu}
					handleMouseEnter={handleMouseEnter}
					isHovered={isHovered}
					toggleMenu={toggleMenu}
					handleMouseLeave={handleMouseLeave}
				/>
			)}
			<RSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
		</>
	);
};

export default Navbar;
