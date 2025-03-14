import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import XPNotification from '../Notifications/XP';
import RecipesHeader from './RecipesHeader';
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
import { addXP, updateXP } from '../../redux/xp';
import RecipeCard from '../RecipeCard/RecipeCard';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [XP, setXP] = useState(0);
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
		setXP(50);
		try {
			await dispatch(addXP(50));
			await dispatch(
				updateXP({ sousChefId: sessionUser.SousChef.id, xp: 50 })
			);
		} catch (error) {
			console.error('Error creating recipe:', error);
		} finally {
			setTimeout(() => navigate('/recipes/new'), 500);
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
				behavior: 'smooth',
			});
		};

		const handleKeyDown = (event) => {
			if (!scrollContainerRef.current) return;
			const scrollAmount = 200;
			const maxScrollLeft =
				scrollContainerRef.current.scrollWidth -
				scrollContainerRef.current.clientWidth;
			const currentScroll = scrollContainerRef.current.scrollLeft;
			if (event.key === 'ArrowLeft' && currentScroll > 0) {
				scrollContainerRef.current.scrollBy({
					left: -scrollAmount,
					behavior: 'smooth',
				});
			} else if (
				event.key === 'ArrowRight' &&
				currentScroll < maxScrollLeft
			) {
				scrollContainerRef.current.scrollBy({
					left: scrollAmount,
					behavior: 'smooth',
				});
			}
		};

		scrollContainer.addEventListener('wheel', handleScroll);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			scrollContainer.removeEventListener('wheel', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
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
			const isLoggedInUser = sessionUser?.id === Number(userId);
			dispatch(fetchRecipes({ userId, isLoggedInUser }));
		} else if (searchQuery) {
			dispatch(fetchRecipes({ search: searchQuery })).then((res) => {
				setSearchResults(res.payload || []);
			});
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
			<XPNotification xp={XP} />
			<button className='create-recipe-btn' onClick={handleCreateRecipe}>
				Create New Recipe <span className='xp-gain'>+50 XP</span>
			</button>

			{searchQuery && recipes.length > 0 && (
				<div className='search-results'>
					<h2>Search Results for: "{searchQuery}"</h2>
					<div className='recipes-scroll-container' ref={setScrollRef}>
						{searchResults.map((recipe) => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
								onFavorite={handleFave}
								isFavorite={faves.some((f) => f.id === recipe.id)}
								showMeta={false}
							/>
						))}
					</div>
				</div>
			)}

			{location.pathname === '/recipes' && (
				<div className='featured-carousel'>
					<h1>Featured Recipes</h1>
					<div className='carousel-scroll-container' ref={setScrollRef}>
						{[...recipes]
							.reverse()
							.slice(0, 8)
							.map((recipe) => (
								<RecipeCard
									key={recipe.id}
									recipe={recipe}
									onFavorite={handleFave}
									isFavorite={faves.some((f) => f.id === recipe.id)}
								/>
							))}
					</div>
				</div>
			)}

			<RecipesHeader />

			<div className='recipes-scroll-container' ref={setScrollRef}>
				{[...recipes].reverse().map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						onFavorite={handleFave}
						isFavorite={faves.some((f) => f.id === recipe.id)}
					/>
				))}
			</div>
		</div>
	);
};

export default Recipes;
