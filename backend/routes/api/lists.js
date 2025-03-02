const express = require('express');
const { requireAuth } = require('../../utils/auth');
const {
	Ingredient,
	Recipe,
	GroceryIngredient,
	List,
	Measurement,
	RecipeIngredient,
} = require('../../db/models');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
	try {
		const userId = req.user.id;

		const lists = await List.findAll({
			where: { userId },
			include: [
				{
					model: GroceryIngredient,
					as: 'Ingredients',
					attributes: ['id'],
				},
			],
		});

		res.json({ lists });
	} catch (error) {
		console.error('Error fetching lists:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/:listId', requireAuth, async (req, res) => {
	try {
		const { listId } = req.params;

		const groceryList = await List.findByPk(listId, {
			include: [
				{
					model: GroceryIngredient,
					as: 'Ingredients',
					attributes: [
						'id',
						'ingredientId',
						'quantity',
						'checked',
						'measurementId',
					],
					include: [
						{ model: Ingredient, attributes: ['id', 'name'] },
						{
							model: Measurement,
							attributes: ['id', 'name', 'abbreviation'],
						},
					],
				},
				{
					model: Recipe,
					attributes: ['servings'],
				},
			],
		});

		if (!groceryList) {
			return res.status(404).json({ error: 'Grocery list not found' });
		}
		// console.error('katie', groceryList)


		const servings = groceryList.Recipe?.servings || 1;
		// console.error('servings', groceryList.Recipe)

		const ingredients = groceryList.Ingredients.map((gi) => ({
			id: gi.id,
			ingredientId: gi.ingredientId,
			quantity: Number(gi.quantity) || 1,
			checked: gi.checked,
			name: gi.Ingredient?.name || 'Unknown',
			measurement: gi.Measurement ? gi.Measurement.name : null,
			abbreviation: gi.Measurement ? gi.Measurement.abbreviation : null,
		}));
		// console.error('katie', ingredients)

		res.json({
			list: { ...groceryList.toJSON(), Ingredients: ingredients },
			servings,
		});
	} catch (error) {
		console.error('Error fetching grocery list:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/', requireAuth, async (req, res) => {
	try {
		const { name, type } = req.body;
		const userId = req.user.id;

		if (!name.trim()) {
			return res.status(400).json({ error: 'List name is required' });
		}

		if (!['shopping', 'todo'].includes(type)) {
			return res.status(400).json({ error: 'Invalid list type' });
		}

		const newList = await List.create({
			userId,
			name,
			type,
		});

		res.json({ message: 'List created successfully!', list: newList });
	} catch (error) {
		console.error('Error creating list:', error);
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
					through: { attributes: ['quantity', 'measurementId'] },
				},
			],
		});

		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

		const groceryList = await List.create({
			userId,
			name: `Grocery List for ${recipe.title}`,
			type: 'shopping',
			recipeId: recipe.id
		});

		const groceryItems = recipe.Ingredients.map((ingredient) => ({
			listId: groceryList.id,
			ingredientId: ingredient.id,
			quantity: ingredient.RecipeIngredient?.quantity || 1,
			checked: false,
			measurementId: ingredient.RecipeIngredient?.measurementId || 'cup',
		}));

		await GroceryIngredient.bulkCreate(groceryItems);

		res.json({
			message: 'Grocery list generated!',
			list: groceryList,
			servings: recipe.servings,
		});
	} catch (error) {
		console.error('Error generating grocery list:', error);
		res.status(500).json({ error: error || 'Internal server error' });
	}
});

router.post('/:listId/bulk-update', requireAuth, async (req, res) => {
	try {
		const { listId } = req.params;
		const { checkedItems } = req.body;

		const updates = Object.entries(checkedItems).map(
			([ingredientId, checked]) => ({
				listId,
				ingredientId,
				checked,
			})
		);

		await Promise.all(
			updates.map(async (update) => {
				const groceryItem = await GroceryIngredient.findOne({
					where: {
						listId: update.listId,
						ingredientId: update.ingredientId,
					},
				});
				if (groceryItem) {
					groceryItem.checked = update.checked;
					await groceryItem.save();
				}
			})
		);

		res.json({ message: 'Bulk update successful' });
	} catch (error) {
		console.error('Error bulk updating grocery list:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.put(
	'/:listId/ingredients/:ingredientId',
	requireAuth,
	async (req, res) => {
		try {
			const { listId, ingredientId } = req.params;
			const { name, quantity, checked, measurementId } = req.body;

			const groceryItem = await GroceryIngredient.findOne({
				where: { listId, ingredientId },
				include: [{ model: Ingredient }],
			});

			if (!groceryItem)
				return res.status(404).json({ error: 'Item not found' });


			if (quantity) groceryItem.quantity = quantity;
			if (measurementId) groceryItem.measurementId = measurementId;
			if (checked !== undefined) groceryItem.checked = checked;

			await groceryItem.save();

			res.json({
				message: 'Updated successfully',
				groceryItem: {
					id: groceryItem.id,
					ingredientId: groceryItem.ingredientId,
					quantity: groceryItem.quantity,
					checked: groceryItem.checked,
					Ingredient: groceryItem.Ingredient
						? {
								id: groceryItem.Ingredient.id,
								name: groceryItem.Ingredient.name,
						}
						: null,
				},
			});
		} catch (error) {
			console.error('katie', error)
			res.status(500).json({
				error:
					error.errors?.[0]?.message ||
					error.message ||
					'Internal server error',
			});
		}
	}
);

router.put(
	'/:listId/grocery-ingredients/:groceryIngredientId/toggle',
	requireAuth,
	async (req, res) => {
		try {
			const { listId, groceryIngredientId } = req.params;
			const { checked } = req.body;

			if (!groceryIngredientId || isNaN(groceryIngredientId)) {
				return res
					.status(400)
					.json({ error: 'Invalid groceryIngredientId' });
			}

			const groceryItem = await GroceryIngredient.findOne({
				where: { id: groceryIngredientId, listId },
			});

			if (!groceryItem) {
				return res.status(404).json({ error: 'Grocery item not found' });
			}

			groceryItem.checked = checked;
			await groceryItem.save();

			res.json({
				message: 'Checked state updated successfully',
				listId,
				groceryIngredientId,
				checked,
			});
		} catch (error) {
			console.error('❌ Error toggling checked state:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

router.put('/:listId/update-name', requireAuth, async (req, res) => {
	try {
		const { listId } = req.params;
		const { name } = req.body;

		const list = await List.findByPk(listId);
		if (!list) return res.status(404).json({ error: 'List not found' });

		list.name = name;
		await list.save();

		res.json({ message: 'List name updated successfully' });
	} catch (error) {
		console.error('Error updating list name:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.delete('/:listId', requireAuth, async (req, res) => {
	try {
		const { listId } = req.params;
		const userId = req.user.id;

		const list = await List.findOne({ where: { id: listId, userId } });

		if (!list) {
			return res
				.status(404)
				.json({ error: 'List not found or unauthorized' });
		}

		await list.destroy();
		res.json({ message: 'List deleted successfully', listId });
	} catch (error) {
		console.error('Error deleting list:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
