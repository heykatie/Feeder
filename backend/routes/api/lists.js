const express = require('express');
const { requireAuth } = require('../../utils/auth');
const {
	Ingredient,
	Recipe,
	GroceryIngredient,
	List,
} = require('../../db/models');
const router = express.Router();

router.get('/:listId', requireAuth, async (req, res) => {
	try {
		const { listId } = req.params;

    const groceryList = await List.findByPk(listId, {
			include: [
				{
					model: GroceryIngredient,
          as: 'Ingredients',
          attributes: ['id', 'ingredientId', 'quantity', 'checked'],
					include: [{ model: Ingredient, attributes: ['id', 'name'] }],
				},
			],
		});

		if (!groceryList) {
			return res.status(404).json({ error: 'Grocery list not found' });
		}
		res.json({ list: groceryList });
	} catch (error) {
		console.error('Error fetching grocery list:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/generate/:recipeId', requireAuth, async (req, res) => {
	try {
		const { recipeId } = req.params;
		const userId = req.user.id;

		const recipe = await Recipe.findByPk(recipeId, {
			include: [
				{
					model: Ingredient,
					as: 'Ingredients',
					through: { attributes: ['quantity'] },
				},
			],
		});

		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		const groceryList = await List.create({
			userId,
			name: `Grocery List for ${recipe.title}`,
			type: 'shopping',
		});

		const groceryItems = recipe.Ingredients.map((ingredient) => ({
			listId: groceryList.id,
			ingredientId: ingredient.id,
			quantity: ingredient.RecipeIngredient?.quantity || '1 unit',
			checked: false,
		}));

		await GroceryIngredient.bulkCreate(groceryItems);

		res.json({ message: 'Grocery list generated!', list: groceryList });
	} catch (error) {
		console.error('Error generating grocery list:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.put(
	'/:listId/ingredients/:ingredientId',
	requireAuth,
	async (req, res) => {
		try {
			const { listId, ingredientId } = req.params;
			const { checked } = req.body;

			const groceryItem = await GroceryIngredient.findOne({
				where: { listId, ingredientId },
			});

			if (!groceryItem)
				return res.status(404).json({ error: 'Item not found' });

			groceryItem.checked = checked;
			await groceryItem.save();

			res.json({ message: 'Updated successfully', groceryItem });
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

module.exports = router;