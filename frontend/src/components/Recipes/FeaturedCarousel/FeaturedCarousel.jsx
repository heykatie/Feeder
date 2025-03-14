import HorizontalScrollContainer from '../../ui/HorizontalScrollContainer';
import RecipeCard from '../RecipeCard';
import './FeaturedCarousel.css'

const FeaturedCarousel = ({ recipes, faves, onFavorite }) => {
	return (
		<div className='featured-carousel'>
			<h1>Featured Recipes</h1>
			<HorizontalScrollContainer className='carousel-scroll-container'>
				{[...recipes]
					.reverse()
					.slice(0, 8)
					.map((recipe) => (
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

export default FeaturedCarousel;
