const express = require('express');
const {
	Recipe,
	Ingredient,
	RecipeIngredient,
	User,
	Favorite,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


const round = (num) => (num ? parseFloat(num.toFixed(2)) : 0);

router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.findAll({
			where: { isPublic: true },
			include: [{ model: User, attributes: ['username'] }],
		});
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch recipes' });
	}
});

router.get('/favorites/:userId', requireAuth, async (req, res) => {
	try {
		const { userId } = req.params;

		// Find all favorite recipes for the user
		const favorites = await Favorite.findAll({
			where: { userId },
			include: [
				{
					model: Recipe,
					include: [{ model: User, attributes: ['username'] }],
				},
			],
		});

		if (!favorites.length) {
			return res.json({ favorites: [] }); // Return an empty array if no favorites
		}

		// Extract recipes from the favorites
		const favoriteRecipes = favorites.map((fav) => fav.Recipe);

		res.json({ favorites: favoriteRecipes });
	} catch (error) {
		console.error('Error fetching favorites:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/public/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const recipes = await Recipe.findAll({
			where: { userId, isPublic: true },
			include: [{ model: User, attributes: ['username'] }],
		});
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user public recipes' });
	}
});

router.get('/all/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		const recipes = await Recipe.findAll({
			where: { userId },
			include: [{ model: User, attributes: ['username'] }],
		});
		res.json(recipes);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch user recipes' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const recipe = await Recipe.findByPk(req.params.id, {
			include: [
				{
					model: Ingredient,
					as: 'Ingredients',
					through: { attributes: ['quantity'] },
				},
			],
		});

		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		const likesCount = await Favorite.count({
			where: { recipeId: recipe.id },
		});

		const nutritionTotals = {
			calories: 0,
			carbohydrates: 0,
			protein: 0,
			fats: 0,
			fiber: 0,
			sodium: 0,
			sugar: 0,
			calcium: 0,
			iron: 0,
			moisture: 0,
		};

		recipe.Ingredients.forEach((ingredient) => {
			nutritionTotals.calories += ingredient.calories || 0;
			nutritionTotals.carbohydrates += ingredient.carbohydrates || 0;
			nutritionTotals.protein += ingredient.protein || 0;
			nutritionTotals.fats += ingredient.fats || 0;
			nutritionTotals.fiber += ingredient.fiber || 0;
			nutritionTotals.sodium += ingredient.sodium || 0;
			nutritionTotals.sugar += ingredient.sugar || 0;
			nutritionTotals.calcium += ingredient.calcium || 0;
			nutritionTotals.iron += ingredient.iron || 0;
			nutritionTotals.moisture += ingredient.moisture || 0;
		});

		const roundedTotals = Object.fromEntries(
			Object.entries(nutritionTotals).map(([key, value]) => [
				key,
				round(value),
			])
		);

		return res.json({
			...recipe.toJSON(),
			likesCount,
			nutritionTotals: roundedTotals,
		});
	} catch (error) {
		console.error('Error fetching recipe:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			userId,
			title,
			description,
			imageUrl,
			category,
			difficulty,
			servings,
			prepTime,
			cookTime,
			totalTime,
			isPublic,
			instructions,
			ingredients, // Expecting [{ id: 1, quantity: "2 cups" }]
		} = req.body;

		if (!userId || !title || !instructions || !ingredients || ingredients.length === 0) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		// Create the recipe
		const newRecipe = await Recipe.create({
			userId,
			title,
			description,
			imageUrl,
			category,
			difficulty,
			servings,
			prepTime,
			cookTime,
			totalTime,
			isPublic,
			instructions,
		});

		// ✅ Debug: Log the received ingredients
		console.log('Received Ingredients:', ingredients);

		// ✅ Ensure ingredients are saved in the RecipeIngredient table
		const ingredientPromises = ingredients.map(async (ingredient) => {
			const existingIngredient = await Ingredient.findByPk(ingredient.id);
			if (!existingIngredient) {
				console.error(`Ingredient ID ${ingredient.id} not found`);
				return null;
			}

			console.log(
				`Associating Ingredient ${ingredient.id} with Recipe ${newRecipe.id}, Quantity: ${ingredient.quantity}`
			);

			return RecipeIngredient.create({
				recipeId: newRecipe.id,
				ingredientId: ingredient.id,
				quantity: ingredient.quantity || '1 unit',
			});
		});

		await Promise.all(ingredientPromises);

		const createdRecipe = await Recipe.findByPk(newRecipe.id, {
			include: [
				{
					model: Ingredient,
					as: 'Ingredients', // ✅ Use the alias defined in the model
					through: { attributes: ['quantity'] }, // ✅ Include quantity from join table
				},
			],
		});

		console.log('Final Created Recipe:', createdRecipe.toJSON());

		return res.status(201).json(createdRecipe);
	} catch (error) {
		console.error('Error creating recipe:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { ingredients, ...updatedData } = req.body;

		const recipe = await Recipe.findByPk(id);
		if (!recipe) {
			return res.status(404).json({ error: 'Recipe not found' });
		}

		// ✅ Update recipe data (excluding ingredients)
		await recipe.update(updatedData);

		if (ingredients && ingredients.length > 0) {
			// ✅ Clear existing ingredient associations
			await RecipeIngredient.destroy({ where: { recipeId: id } });

			// ✅ Re-add updated ingredients
			const ingredientPromises = ingredients.map(async (ingredient) => {
				const existingIngredient = await Ingredient.findByPk(ingredient.id);
				if (!existingIngredient) {
					console.error(`Ingredient ID ${ingredient.id} not found`);
					return null;
				}
				return RecipeIngredient.create({
					recipeId: id,
					ingredientId: ingredient.id,
					quantity: ingredient.quantity || '1 unit',
				});
			});

			await Promise.all(ingredientPromises);
		}

		// ✅ Fetch updated recipe with ingredients
		const updatedRecipe = await Recipe.findByPk(id, {
			include: [
				{ model: Ingredient, as: 'Ingredients', through: RecipeIngredient },
			],
		});

		return res.json(updatedRecipe);
	} catch (error) {
		console.error('Error updating recipe:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/:id/favorite', requireAuth, async (req, res) => {

});

// DELETE a recipe (requires authentication & ownership)
router.delete('/:id', requireAuth, async (req, res) => {
	const recipe = await Recipe.findByPk(req.params.id);
	if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

	if (recipe.userId !== req.user.id)
		return res.status(403).json({ error: 'Unauthorized' });

	await recipe.destroy();
	return res.json({ message: 'Recipe deleted' });
});

module.exports = router;
