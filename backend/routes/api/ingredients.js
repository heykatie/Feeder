const express = require('express');
const { Ingredient, GroceryIngredient } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const ingredients = await Ingredient.findAll();
		return res.json(ingredients);
	} catch (error) {
		console.error('Error fetching ingredients:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/:listId/:ingredientId', async (req, res) => {
	try {
		const { listId, ingredientId } = req.params;

		console.log(`🗑 Deleting ingredient ${ingredientId} from list ${listId}`);

		const groceryIngredient = await GroceryIngredient.findOne({
			where: { listId, ingredientId },
		});

		if (!groceryIngredient) {
			console.error(`❌ GroceryIngredient not found for list ${listId} and ingredient ${ingredientId}`);
			return res.status(404).json({ error: 'Ingredient not found in the list' });
		}

		await groceryIngredient.destroy();

		console.log(`✅ Successfully deleted ingredient ${ingredientId} from list ${listId}`);

		return res.json({ message: 'Ingredient deleted successfully', ingredientId });
	} catch (error) {
		console.error('❌ Error deleting grocery ingredient:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
