import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import XPNotification from '../Notifications/XP';
import RecipesHeader from './RecipesHeader/RecipesHeader';
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
	useParams,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchResults from './SearchResults';
import FeaturedCarousel from './FeaturedCarousel';
import useRecipesData from './useRecipesData';
import './Recipes.css';

const Recipes = () => {
	const dispatch = useDispatch();
	const [XP, setXP] = useState(0);
	const { userId } = useParams();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('search');
	const sessionUser = useSelector((state) => state.session.user);

	const { recipes, faves, searchResults } = useRecipesData(
		userId,
		searchQuery,
		location.pathname,
		sessionUser
	);

	const handleFave = async (recipe) => {
		await dispatch(toggleFavorite(recipe.id));
		await dispatch(fetchFavorites());
	};

	if (!recipes.length) return <p className='no-recipes'>No recipes found.</p>;

	return (
		<div className='recipes-container'>
			<div className='recipes-actions'>
				<XPNotification xp={XP} />
				<CreateRecipeButton />
			</div>

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

			<div className='non-featured-grid'>
				{[...recipes].reverse().slice(8).map((recipe) => (
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