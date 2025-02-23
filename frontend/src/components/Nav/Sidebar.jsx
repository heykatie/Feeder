import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = ({ showMenu, toggleMenu }) => {
	const userId = useSelector(state => state.session.userId);

	return (
		<>
			{/* Floating Icons */}
			<div className={`sidebar ${showMenu ? 'hidden' : ''}`}>
				<Link to='/home' className='sidebar-link'>
					<i className='fa-solid fa-house'></i>
				</Link>
				<Link to='/recipes' className='sidebar-link'>
					<i className='fa-solid fa-book'></i>
				</Link>
				<Link to={`/favorites`} className='sidebar-link'>
					<i className='fa-solid fa-heart'></i>
				</Link>
				<Link to='/recipes/new' className='sidebar-link'>
					<i className='fa-solid fa-pen'></i>
				</Link>
				<Link to={`/recipes/${userId}`} className='sidebar-link'>
					<i className='fa-solid fa-bookmark'></i>
				</Link>
				<Link to='/lists' className='sidebar-link'>
					<i className='fa-solid fa-list'></i>
				</Link>
			</div>

			{/* Expandable Side Panel */}
			<div className={`sidebar-panel ${showMenu ? 'expanded' : ''}`}>
				<button
					aria-label='close-btn'
					className='close-btn'
					onClick={toggleMenu}>
					<i className='fa-solid fa-xmark'></i>
				</button>
				<Link to='/home' onClick={toggleMenu} className='sidebar-link'>
					<i className='fa-solid fa-house'></i>{' '}
					<span className='text'>Home</span>
				</Link>
				<Link to='/recipes' onClick={toggleMenu} className='sidebar-link'>
					<i className='fa-solid fa-book'></i>{' '}
					<span className='text'>Explore</span>
				</Link>
				<Link to='/favorites' onClick={toggleMenu} className='sidebar-link'>
					<i className='fa-solid fa-heart'></i>{' '}
					<span className='text'>My Favorites</span>
				</Link>
				<Link
					to='/recipes/new'
					onClick={toggleMenu}
					className='sidebar-link'>
					<i className='fa-solid fa-pen'></i>{' '}
					<span className='text'>Post a Recipe</span>
				</Link>
				<Link
					to={`/recipes/${userId}`}
					onClick={toggleMenu}
					className='sidebar-link'>
					<i className='fa-solid fa-bookmark'></i>{' '}
					<span className='text'>My Recipes</span>
				</Link>
				<Link to='/lists' onClick={toggleMenu} className='sidebar-link'>
					<i className='fa-solid fa-list'></i>{' '}
					<span className='text'>Lists</span>
				</Link>
			</div>
		</>
	);
};

export default Sidebar;