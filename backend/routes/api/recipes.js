const express = require('express');
const { Recipe, Ingredient, RecipeIngredient } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
	const recipes = await Recipe.findAll();
	return res.json(recipes);
});

router.get('/:id', async (req, res) => {
	const recipe = await Recipe.findByPk(req.params.id, {
		include: [{ model: Ingredient, through: { attributes: ['quantity'] } }],
	});

	if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

	return res.json({
		...recipe.toJSON(),
		ingredients: recipe.Ingredients.map((i) => ({
			name: i.name,
			quantity: i.RecipeIngredient.quantity,
		})),
	});
});

// POST create a new recipe (requires authentication)
router.post("/", requireAuth, async (req, res) => {
  const { title, description, imageUrl, category } = req.body;
  const userId = req.user.id;

  const newRecipe = await Recipe.create({
    userId,
    title,
    description,
    imageUrl,
    category: category || "Uncategorized",
  });

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
