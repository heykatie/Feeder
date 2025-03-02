import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchRecipes,
	fetchFavorites,
	toggleFavorite,
} from '../../redux/recipes';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const allRecipes = useSelector((state) => state.recipes.allRecipes);
	const faves = useSelector((state) => state.recipes.favorites);
	const [recipes, setRecipes] = useState([]);
	const scrollContainerRef = useRef(null); // Reference for scrolling container

	const setScrollRef = useCallback((node) => {
		if (node) {
			scrollContainerRef.current = node;
			attachScrollListeners(node);
		}
	}, []);

	const attachScrollListeners = (scrollContainer) => {
		if (!scrollContainer) return;

		const handleScroll = (event) => {
			event.preventDefault();
			if (!scrollContainerRef.current) return;
			scrollContainer.scrollBy({
				left: event.deltaY * 2,
				behavior: 'smooth', // Enable smooth scrolling
			});
		};

		const handleKeyDown = (event) => {
			if (!scrollContainerRef.current) return;

			const scrollAmount = 200; // Adjust scroll step size
			const maxScrollLeft =
				scrollContainerRef.current.scrollWidth -
				scrollContainerRef.current.clientWidth;
			const currentScroll = scrollContainerRef.current.scrollLeft;

			if (event.key === 'ArrowLeft') {
				if (currentScroll > 0) {
					scrollContainerRef.current.scrollBy({
						left: -scrollAmount,
						behavior: 'smooth',
					});
				}
			} else if (event.key === 'ArrowRight') {
				if (currentScroll < maxScrollLeft) {
					scrollContainerRef.current.scrollBy({
						left: scrollAmount,
						behavior: 'smooth',
					});
				}
			}
		};

		const handleEdgeScroll = (event) => {
			const { clientX } = event;
			const edgeThreshold = 180; // Increase threshold area for smoother activation
			const maxSpeed = 0.05; // Reduce max scroll speed for slower movement
			const minSpeed = 0.005; // Ensure gradual acceleration

			if (!scrollContainerRef.current) return;

			const container = scrollContainerRef.current;
			let scrollAmount = 0;

			if (clientX < edgeThreshold) {
				scrollAmount =
					Math.max(minSpeed, (edgeThreshold - clientX) / 500) * -maxSpeed;
			} else if (clientX > window.innerWidth - edgeThreshold) {
				scrollAmount =
					Math.max(
						minSpeed,
						(clientX - (window.innerWidth - edgeThreshold)) / 500
					) * maxSpeed;
			}

			if (scrollAmount !== 0) {
				requestAnimationFrame(() => {
					container.scrollBy({
						left: scrollAmount,
						behavior: 'smooth',
					});
				});
			}
		};

		scrollContainer.addEventListener('wheel', handleScroll);
		window.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousemove', handleEdgeScroll);

		return () => {
			scrollContainer.removeEventListener('wheel', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousemove', handleEdgeScroll);
		};
	};

	useEffect(() => {
		if (scrollContainerRef.current) {
			attachScrollListeners(scrollContainerRef.current);
		}
	}, []);

	useEffect(() => {
		if (location.pathname === '/recipes') {
			dispatch(fetchRecipes());
		} else if (location.pathname === '/favorites') {
			dispatch(fetchFavorites());
		} else if (userId) {
			const isLoggedInUser = sessionUser?.id == Number(userId);
			dispatch(fetchRecipes({ userId, isLoggedInUser }));
		}
	}, [dispatch, userId, sessionUser, location.pathname]);

	// Update recipes state
	useEffect(() => {
		if (location.pathname === '/recipes') {
			setRecipes(allRecipes);
		} else if (location.pathname === '/favorites') {
			setRecipes(faves);
		}
	}, [allRecipes, faves, location.pathname]);

	if (!recipes.length) return <p className='no-recipes'>No recipes found.</p>;

	return (
		<div className='recipes-container'>
			<div className='recipes-header'>
				{location.pathname === '/favorites' ? (
					<h1>My Favorite Recipes</h1>
				) : userId ? (
					<h1>My Recipes</h1>
				) : (
					<h1>Explore Recipes</h1>
				)}
				<button
					className='create-recipe-btn'
					onClick={() => navigate('/recipes/new')}>
					Create New Recipe
				</button>
			</div>

			{/* 📌 Scrollable Container with Mouse & Keyboard Support */}
			<div className='recipes-scroll-container' ref={setScrollRef}>
				{recipes.map((recipe) => (
					<div key={recipe.id} className='recipe-card'>
						<NavLink to={`/recipes/${recipe.id}`} className='recipe-link'>
							<img
								src={recipe.imageUrl || '/images/recipes/dogfood.jpeg'}
								alt={recipe.title}
								className='recipe-image'
							/>
							<h2>{recipe.title}</h2>
							<p>{recipe.description}</p>
						</NavLink>

						<button
							className='favorite-btn'
							onClick={(e) => {
								e.stopPropagation();
								dispatch(toggleFavorite(recipe.id));
							}}>
							{recipe.liked ? (
								<FaHeart color='red' />
							) : (
								<FaRegHeart color='gray' />
							)}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recipes;
