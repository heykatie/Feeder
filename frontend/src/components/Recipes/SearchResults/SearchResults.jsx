import HorizontalScrollContainer from '../../ui/HorizontalScrollContainer';
import RecipeCard from '../RecipeCard';
import './SearchResults.css';

const SearchResults = ({ searchQuery, searchResults, faves, onFavorite }) => {
	return (
		<div className='search-results'>
			<h2>Search Results for: "{searchQuery}"</h2>
			<HorizontalScrollContainer className='recipes-scroll-container'>
				{searchResults.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						onFavorite={onFavorite}
						isFavorite={faves.some((f) => f.id === recipe.id)}
						showMeta={true}
					/>
				))}
			</HorizontalScrollContainer>
		</div>
	);
};

export default SearchResults;
