import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRecipePrivacy } from '../../../redux/recipes';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({
	recipe,
	onFavorite,
	isFavorite,
	showMeta = true,
	hideDesc,
}) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { userId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className='recipe-card'>
			<NavLink
				state={{
					from: location.pathname + location.search,
				}}
				to={`/recipes/${recipe.id}`}
				className='recipe-link'>
				<img
					src={recipe.imageUrl || '/images/recipes/dogfood.jpeg'}
					alt={recipe.title}
					className='recipe-image'
				/>
				<h2>{recipe.title}</h2>
				{!hideDesc && <p className='recipe-description'>{recipe.description}</p>}
				{showMeta && (
					<div className='recipe-meta'>
						<p className='recipe-rating'>⭐ {recipe.rating} / 5</p>
						{recipe.totalTime > 0 && (
							<p className='recipe-time'>⏲️ {recipe.totalTime}m</p>
						)}
						<p className='recipe-likes'>❤️ {recipe.likesCount} Likes</p>
					</div>
				)}
			</NavLink>
			{userId && sessionUser?.id == userId && (
				<button
					className={`privacy-toggle ${
						recipe.isPublic ? 'public' : 'private'
					}`}
					onClick={() => dispatch(toggleRecipePrivacy(recipe.id))}>
					{recipe.isPublic ? '🔓 Public' : '🔒 Private'}
				</button>
			)}
			<button
				className='favorite-btn'
				onClick={(e) => {
					e.stopPropagation();
					onFavorite(recipe);
				}}>
				{isFavorite ? <FaHeart color='red' /> : <FaRegHeart color='gray' />}
			</button>
		</div>
	);
};

export default RecipeCard;
