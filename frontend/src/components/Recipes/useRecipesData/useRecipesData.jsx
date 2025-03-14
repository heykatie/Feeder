import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, fetchFavorites } from '../../../redux/recipes'

const useRecipesData = (userId, searchQuery, locationPathname, sessionUser) => {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes.allRecipes);
	const faves = useSelector((state) => state.recipes.favorites);
	const [searchResults, setSearchResults] = useState([]);

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
	}, [dispatch, userId, sessionUser, locationPathname, searchQuery]);

	const recipes = locationPathname === '/favorites' ? faves : allRecipes;

	return { recipes, faves, searchResults };
};

export default useRecipesData;
