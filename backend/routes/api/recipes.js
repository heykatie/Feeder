const express = require('express');
const { Recipe, Ingredient, RecipeIngredient } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const round = (num) => (num ? parseFloat(num.toFixed(2)) : 0);

// GET all recipes
router.get('/', async (req, res) => {
	const recipes = await Recipe.findAll();
	return res.json(recipes);
});


router.get('/:id', async (req, res) => {
	try {
		const recipe = await Recipe.findByPk(req.params.id, {
			include: [
				{
					model: Ingredient,
					through: { attributes: ['quantity'] }, // Include quantity from join table
				},
			],
		});

		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		// Calculate total nutrition values
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
			nutritionTotals: roundedTotals,
		});
	} catch (error) {
		console.error('Error fetching recipe:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/', requireAuth, async (req, res) => {
	const {
		title,
		description,
		imageUrl,
		category,
		difficulty,
		servings,
		prepTime,
		cookTime,
		instructions,
		ingredients,
	} = req.body;
	const userId = req.user.id;

	const newRecipe = await Recipe.create({
		userId,
		title,
		description,
		imageUrl,
		category: category || 'Uncategorized',
		difficulty,
		servings,
		prepTime,
		cookTime,
		instructions,
	});

	if (ingredients && ingredients.length > 0) {
		await Promise.all(
			ingredients.map(async (ingredient) => {
				await RecipeIngredient.create({
					recipeId: newRecipe.id,
					ingredientId: ingredient.id,
					quantity: ingredient.quantity,
				});
			})
		);
	}

	return res.status(201).json(newRecipe);
});

// PUT update a recipe (requires authentication & ownership)
router.put("/:id", requireAuth, async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  if (!recipe) return res.status(404).json({ error: "Recipe not found" });

  if (recipe.userId !== req.user.id)
    return res.status(403).json({ error: "Unauthorized" });

  const { title, description, imageUrl, category } = req.body;
  await recipe.update({ title, description, imageUrl, category });

  return res.json(recipe);
});

// PUT update a recipe (requires authentication & ownership)
router.put('/:id', requireAuth, async (req, res) => {
	const recipe = await Recipe.findByPk(req.params.id);
	if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

	if (recipe.userId !== req.user.id)
		return res.status(403).json({ error: 'Unauthorized' });

	const { title, description, imageUrl } = req.body;
	await recipe.update({ title, description, imageUrl });

	return res.json(recipe);
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
