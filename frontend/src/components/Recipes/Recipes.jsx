import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import XPNotification from '../Notifications/XP';
import RecipesHeader from './RecipesHeader';
import HorizontalScrollContainer from '../ui/HorizontalScrollContainer';
import CreateRecipeButton from './CreateRecipeButton';
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
import RecipeCard from './RecipeCard';
import './Recipes.css';
import SearchResults from './SearchResults';
import FeaturedCarousel from './FeaturedCarousel';

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
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');

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
			<CreateRecipeButton />

			{searchQuery && recipes.length > 0 && (
				<SearchResults
					searchQuery={searchQuery}
					searchResults={searchResults}
					faves={faves}
					onFavorite={handleFave}
				/>
			)}

			{location.pathname === '/recipes' && (
				<FeaturedCarousel
					recipes={recipes}
					faves={faves}
					onFavorite={handleFave}
				/>
			)}

			<RecipesHeader />

			<HorizontalScrollContainer className='recipes-scroll-container'>
				{[...recipes].reverse().map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						onFavorite={handleFave}
						isFavorite={faves.some((f) => f.id === recipe.id)}
					/>
				))}
			</HorizontalScrollContainer>
		</div>
	);
};

export default Recipes;
