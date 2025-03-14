import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addXP, updateXP } from '../../../redux/xp';
import { useNavigate } from 'react-router-dom';
import './CreateRecipeButton.css';

const CreateRecipeButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sessionUser = useSelector((state) => state.session.user);
	const [xp, setXp] = useState(0);

	const handleCreateRecipe = async () => {
		setXp(50);
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

	return (
		<button className='create-recipe-btn' onClick={handleCreateRecipe}>
			Create New Recipe <span className='xp-gain'>+50 XP</span>
		</button>
	);
};

export default CreateRecipeButton;
