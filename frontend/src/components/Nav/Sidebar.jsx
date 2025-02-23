import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = ({ showMenu, toggleMenu }) => {
	const userId = useSelector(state => state.session.userId);

	return (
		<>
			<div className={`sidebar ${showMenu ? 'hidden' : ''}`}>
				<NavLink to='/home' className='sidebar-navLink'>
					<i className='fa-solid fa-house'></i>
				</NavLink>
				<NavLink to='/recipes' className='sidebar-navLink'>
					<i className='fa-solid fa-book'></i>
				</NavLink>
				<NavLink to={`/favorites`} className='sidebar-navLink'>
					<i className='fa-solid fa-heart'></i>
				</NavLink>
				<NavLink to='/recipes/new' className='sidebar-navLink'>
					<i className='fa-solid fa-pen'></i>
				</NavLink>
				<NavLink to={`/recipes/${userId}`} className='sidebar-navLink'>
					<i className='fa-solid fa-bookmark'></i>
				</NavLink>
				<NavLink to='/lists' className='sidebar-navLink'>
					<i className='fa-solid fa-list'></i>
				</NavLink>
			</div>

			<div className={`sidebar-panel ${showMenu ? 'expanded' : ''}`}>
				<button
					aria-label='close-btn'
					className='close-btn'
					onClick={toggleMenu}>
					<i className='fa-solid fa-xmark'></i>
				</button>
				<NavLink to='/home' onClick={toggleMenu} className='sidebar-navLink'>
					<i className='fa-solid fa-house'></i>{' '}
					<span className='text'>Home</span>
				</NavLink>
				<NavLink to='/recipes' onClick={toggleMenu} className='sidebar-navLink'>
					<i className='fa-solid fa-book'></i>{' '}
					<span className='text'>Explore</span>
				</NavLink>
				<NavLink to='/favorites' onClick={toggleMenu} className='sidebar-navLink'>
					<i className='fa-solid fa-heart'></i>{' '}
					<span className='text'>My Favorites</span>
				</NavLink>
				<NavLink
					to='/recipes/new'
					onClick={toggleMenu}
					className='sidebar-navLink'>
					<i className='fa-solid fa-pen'></i>{' '}
					<span className='text'>Post a Recipe</span>
				</NavLink>
				<NavLink
					to={`/recipes/${userId}`}
					onClick={toggleMenu}
					className='sidebar-navLink'>
					<i className='fa-solid fa-bookmark'></i>{' '}
					<span className='text'>My Recipes</span>
				</NavLink>
				<NavLink to='/lists' onClick={toggleMenu} className='sidebar-navLink'>
					<i className='fa-solid fa-list'></i>{' '}
					<span className='text'>Lists</span>
				</NavLink>
			</div>
		</>
	);
};

export default Sidebar;