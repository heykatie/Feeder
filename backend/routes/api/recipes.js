const express = require('express');
const {
	Recipe,
	Ingredient,
	RecipeIngredient,
	User,
	Favorite,
	Sequelize,
	Measurement,
} = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

const round = (num) => (num ? parseFloat(num.toFixed(2)) : 0);

router.get('/', requireAuth, async (req, res) => {
	try {
		const userId = req.user.id;
		const { search } = req.query;

		let where = { isPublic: true };

		if (search) {
			where = {
				[Sequelize.Op.or]: [
					{
						title: {
							[Sequelize.Op.iLike]: `${search}%`, // More strict matching (only from start)
						},
					},
					{
						description: {
							[Sequelize.Op.iLike]: `%${search}%`,
						},
					},
				],
			};
		}

		// Fetch public recipes with user data
		// const recipes = await Recipe.findAll({
		// 	where,
		// 	include: [
		// 		{ model: User, attributes: ['username'] },
		// 		{ model: Ingredient, as: 'Ingredients', attributes: ['name'] },
		// 	],
		// });

		const recipes = await Recipe.findAll({
			where,
			include: [
				{
					model: Ingredient,
					as: 'Ingredients',
					attributes: ['name'],
					where: search
						? {
								name: { [Sequelize.Op.iLike]: `%${search}%` },
						}
						: undefined,
					required: false, // Ensure recipes without matching ingredients aren't excluded
				},
				{ model: User, attributes: ['username'] },
			],
		});

		// Fetch user's favorite recipes
		const userFavorites = await Favorite.findAll({
			where: { userId },
			attributes: ['recipeId'],
		});

		const favoriteRecipeIds = new Set(
			userFavorites.map((fav) => fav.recipeId)
		);

		// Fetch likes count for each recipe
		const recipeLikes = await Favorite.findAll({
			attributes: [
				'recipeId',
				[Sequelize.fn('COUNT', Sequelize.col('recipeId')), 'likesCount'],
			],
			group: ['recipeId'],
			raw: true,
		});

		const likesMap = {};
		recipeLikes.forEach((entry) => {
			likesMap[entry.recipeId] = entry.likesCount;
		});

		// Attach `liked` and `likesCount` to each recipe
		const updatedRecipes = recipes.map((recipe) => ({
			...recipe.toJSON(),
			liked: favoriteRecipeIds.has(recipe.id),
			likesCount: likesMap[recipe.id] || 0,
		}));

		res.json(updatedRecipes);
	} catch (error) {
		console.error('Error fetching recipes:', error);
		res.status(500).json({ error: 'Failed to fetch recipes' });
	}
});

router.get('/favorites/:userId', requireAuth, async (req, res) => {
	try {
		const { userId } = req.params;

		const favorites = await Favorite.findAll({
			where: { userId },
			attributes: ['recipeId'],
			include: [
				{
					model: Recipe,
					include: [{ model: User, attributes: ['username'] }],
				},
			],
		});

		if (!favorites.length) {
			return res.json({ favorites: [] });
		}

		const favoriteRecipeIds = new Set(favorites.map((fav) => fav.recipeId));

		const recipeLikes = await Favorite.findAll({
			attributes: [
				'recipeId',
				[Sequelize.fn('COUNT', Sequelize.col('recipeId')), 'likesCount'],
			],
			group: ['recipeId'],
			raw: true,
		});

		const likesMap = {};
		recipeLikes.forEach((entry) => {
			likesMap[entry.recipeId] = entry.likesCount;
		});

		const favoriteRecipes = favorites.map((fav) => {
			const recipe = fav.Recipe.toJSON();
			return {
				...recipe,
				liked: favoriteRecipeIds.has(recipe.id),
				likesCount: likesMap[recipe.id] || 0,
			};
		});

		res.json({ favorites: favoriteRecipes });
	} catch (error) {
		console.error('Error fetching favorite recipes:', error);
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
		const userId = req.user.id;
		const recipe = await Recipe.findByPk(req.params.id, {
			include: [
				{
					model: Ingredient,
					as: 'Ingredients',
					attributes: [
						'id',
						'name',
						'calories',
						'protein',
						'fats',
						'carbohydrates',
						'fiber',
						'sodium',
						'sugar',
						'calcium',
						'iron',
						'moisture',
						'servingSize',
						'image',
					],
					through: { attributes: ['quantity', 'measurementId'] },
				},
				{
					model: RecipeIngredient,
					as: 'RecipeIngredients',
					include: [
						{ model: Measurement, attributes: ['name', 'abbreviation'] },
					],
				},
			],
		});

		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		const likesCount = await Favorite.count({
			where: { recipeId: recipe.id },
		});

		const existingFavorite = await Favorite.findOne({
			where: { userId, recipeId: recipe.id },
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

		const formattedIngredients = recipe.Ingredients.map((ingredient) => {
			const recipeIngredient = recipe.RecipeIngredients.find(
				(ri) => ri.ingredientId === ingredient.id
			);

			return {
				...ingredient.toJSON(),
				id: ingredient.id,
				name: ingredient.name,
				quantity: recipeIngredient?.quantity || 1,
				measurement: recipeIngredient?.Measurement?.name || null,
				abbreviation: recipeIngredient?.Measurement?.abbreviation || null,
			};
		});

		console.error('katie', {
			...recipe.toJSON(),
			likesCount,
			liked: !!existingFavorite,
			nutritionTotals: roundedTotals,
			Ingredients: formattedIngredients,
		});
		return res.json({
			...recipe.toJSON(),
			likesCount,
			liked: !!existingFavorite,
			nutritionTotals: roundedTotals,
			Ingredients: formattedIngredients,
		});
	} catch (error) {
		console.error('Error fetching recipe:', error);
		return res.status(500).json(error || { error: 'Internal server error' });
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
			ingredients, // [{ id: 1, quantity: "2 cups" }]
		} = req.body;

		if (
			!userId ||
			!title ||
			!instructions ||
			!ingredients ||
			ingredients.length === 0
		) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

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

		// console.log('Received Ingredients:', ingredients);

		const ingredientPromises = ingredients.map(async (ingredient) => {
			const existingIngredient = await Ingredient.findByPk(ingredient.id);
			if (!existingIngredient) {
				console.error(`Ingredient ID ${ingredient.id} not found`);
				return null;
			}

			// console.log(
			// 	`Associating Ingredient ${ingredient.id} with Recipe ${newRecipe.id}, Quantity: ${ingredient.quantity}`
			// );

			return RecipeIngredient.create({
				recipeId: newRecipe.id,
				ingredientId: ingredient.id,
				quantity: ingredient.quantity || 1,
				measurementId: ingredient.measurementId || null,
			});
		});

		await Promise.all(ingredientPromises);

		const createdRecipe = await Recipe.findByPk(newRecipe.id, {
			include: [
				{
					model: Ingredient,
					as: 'Ingredients',
					through: { attributes: ['quantity', 'measurementId'] },
				},
			],
		});

		// console.log('Final Created Recipe:', createdRecipe.toJSON());

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

		await recipe.update(updatedData);

		if (ingredients && ingredients.length > 0) {
			await RecipeIngredient.destroy({ where: { recipeId: id } });

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
	try {
		const { id } = req.params;
		const userId = req.user.id;

		const recipe = await Recipe.findByPk(id);
		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		const existingFavorite = await Favorite.findOne({
			where: { userId, recipeId: id },
		});

		if (existingFavorite) {
			await existingFavorite.destroy();
			return res.json({ message: 'Removed from favorites', liked: false, recipeId: id});
		} else {
			await Favorite.create({ userId, recipeId: id });
			return res.json({ message: 'Added to favorites', liked: true, recipeId: id });
		}
	} catch (error) {
		console.error('Error toggling favorite:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/:id', requireAuth, async (req, res) => {
	const recipe = await Recipe.findByPk(req.params.id);
	if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

	if (recipe.userId !== req.user.id)
		return res.status(403).json({ error: 'Unauthorized' });

	await recipe.destroy();
	return res.json({ message: 'Recipe deleted' });
});

module.exports = router;
