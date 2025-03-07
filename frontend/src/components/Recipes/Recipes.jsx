import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchRecipes,
	fetchFavorites,
	toggleFavorite,
	toggleRecipePrivacy,
} from '../../redux/recipes';
import {
	NavLink,
	useNavigate,
	useParams,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Recipes.css';
import { addXP, updateXP } from '../../redux/xp';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userId } = useParams();
	const location = useLocation();
	const sessionUser = useSelector((state) => state.session.user);
	const allRecipes = useSelector((state) => state.recipes.allRecipes);
	const [searchResults, setSearchResults] = useState([]);
	const faves = useSelector((state) => state.recipes.favorites);
	const recipes = location.pathname === '/favorites' ? faves : allRecipes;
	const scrollContainerRef = useRef(null);
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');

	const handleCreateRecipe = async () => {
		try {
			await dispatch(addXP(50)); // Grant 50 XP
			await dispatch(updateXP({ sousChefId: sessionUser.SousChef.id, xp: 50 })); // Save XP in DB

			navigate('/recipes/new');
		} catch (error) {
			console.error('Error creating recipe:', error);
		}
	};

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

		// const handleEdgeScroll = (event) => {
		// 	const { clientX } = event;
		// 	const edgeThreshold = 50;
		// 	const maxSpeed = 0.05;
		// 	const minSpeed = 0.005;

		// 	if (!scrollContainerRef.current) return;

		// 	const container = scrollContainerRef.current;
		// 	let scrollAmount = 0;

		// 	if (clientX < edgeThreshold) {
		// 		scrollAmount =
		// 			Math.max(minSpeed, (edgeThreshold - clientX) / 500) * -maxSpeed;
		// 	} else if (clientX > window.innerWidth - edgeThreshold) {
		// 		scrollAmount =
		// 			Math.max(
		// 				minSpeed,
		// 				(clientX - (window.innerWidth - edgeThreshold)) / 500
		// 			) * maxSpeed;
		// 	}

		// 	if (scrollAmount !== 0) {
		// 		requestAnimationFrame(() => {
		// 			container.scrollBy({
		// 				left: scrollAmount,
		// 				behavior: 'smooth',
		// 			});
		// 		});
		// 	}
		// };

		scrollContainer.addEventListener('wheel', handleScroll);
		window.addEventListener('keydown', handleKeyDown);
		// document.addEventListener('mousemove', handleEdgeScroll);

		return () => {
			scrollContainer.removeEventListener('wheel', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
			// document.removeEventListener('mousemove', handleEdgeScroll);
		};
	};

	useEffect(() => {
		if (scrollContainerRef.current) {
			attachScrollListeners(scrollContainerRef.current);
		}
	}, []);

	useEffect(() => {
		dispatch(fetchFavorites());
		if (userId) {
			const isLoggedInUser = sessionUser?.id == Number(userId);
			dispatch(fetchRecipes({ userId, isLoggedInUser }));
		} else if (searchQuery) {
			dispatch(fetchRecipes({ search: searchQuery })).then((res) => {
				setSearchResults(res.payload || []);
			});
		} else if (!sessionUser) {
			dispatch(fetchRecipes())
		} else {
			dispatch(fetchRecipes());
		}
	}, [dispatch, userId, sessionUser, location.pathname, searchQuery]);

	const handleFave = async (recipe) => {
		await dispatch(toggleFavorite(recipe.id));
		await dispatch(fetchFavorites());
	};

	if (!recipes.length) return <p className='no-recipes'>No recipes found.</p>;

	return (
		<div className='recipes-container'>
			{searchQuery && recipes.length > 0 && (
				<div className='search-results'>
					<h2>Search Results for: &quot;{searchQuery}&quot;</h2>
					<div className='recipes-scroll-container' ref={setScrollRef}>
						{searchResults.map((recipe) => (
							<div key={recipe.id} className='recipe-card'>
								<NavLink
									state={{ from: location.pathname + location.search }}
									to={`/recipes/${recipe.id}`}
									className='recipe-link'>
									<img
										src={
											recipe.imageUrl ||
											'/images/recipes/dogfood.jpeg'
										}
										alt={recipe.title}
										className='recipe-image'
									/>
									<h2>{recipe.title}</h2>
									<p>{recipe.description}</p>
								</NavLink>

								<button
									className='favorite-btn'
									onClick={async (e) => {
										e.stopPropagation();
										handleFave(recipe);
									}}>
									{faves.some((f) => f.id === recipe.id) ? (
										<FaHeart color='red' />
									) : (
										<FaRegHeart color='gray' />
									)}
									{/* {recipe.liked ? (
										<FaHeart color='red' />
									) : (
										<FaRegHeart color='gray' />
									)} */}
								</button>
							</div>
						))}
					</div>
				</div>
			)}

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
					onClick={handleCreateRecipe}>
					Create New Recipe <span className='xp-gain'>+50 XP</span>
				</button>
			</div>

			<div className='recipes-scroll-container' ref={setScrollRef}>
				{[...recipes].reverse().map((recipe) => (
					<div key={recipe.id} className='recipe-card'>
						<NavLink
							state={
								location.search
									? null
									: { from: location.pathname + location.search }
							}
							to={`/recipes/${recipe.id}`}
							className='recipe-link'>
							<img
								src={recipe.imageUrl || '/images/recipes/dogfood.jpeg'}
								alt={recipe.title}
								className='recipe-image'
							/>
							<h2>{recipe.title}</h2>
							<p>{recipe.description}</p>
							{recipe.totalTime > 0 && (
								<p className='recipe-time'>
									Total Time: {recipe.totalTime} min
								</p>
							)}
							<div className='recipe-meta'>
								<p className='recipe-rating'>⭐ {recipe.rating} / 5</p>
								<p className='recipe-likes'>
									❤️ {recipe.likesCount} Likes
								</p>
							</div>
						</NavLink>

						{userId && sessionUser?.id == userId && (
							<button
								className={`privacy-toggle ${
									recipe.isPublic ? 'public' : 'private'
								}`}
								onClick={() =>
									dispatch(toggleRecipePrivacy(recipe.id))
								}>
								{recipe.isPublic ? '🔓 Public' : '🔒 Private'}
							</button>
						)}

						<button
							className='favorite-btn'
							onClick={(e) => {
								e.stopPropagation();

								// if (location.pathname === '/favorites') {
								// 	setRecipes((prevRecipes) =>
								// 		prevRecipes.filter((r) => r.id !== recipe.id)
								// 	);
								// } else {
								// 	setRecipes((prevRecipes) =>
								// 		prevRecipes.map((r) =>
								// 			r.id === recipe.id
								// 				? { ...r, liked: !r.liked }
								// 				: r
								// 		)
								// 	);
								// }
								handleFave(recipe);
							}}>
							{faves.some((f) => f.id === recipe.id) ? (
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
