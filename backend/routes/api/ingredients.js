const express = require('express');
const { Ingredient, GroceryIngredient } = require('../../db/models');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');


router.get('/', async (req, res) => {
	try {
		const ingredients = await Ingredient.findAll();
		return res.json(ingredients);
	} catch (error) {
		console.error('Error fetching ingredients:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			name,
			calories,
			carbohydrates,
			protein,
			fats,
			fiber,
			sodium,
			sugar,
			calcium,
			iron,
			moisture,
			servingSize,
			image,
		} = req.body;

		if (!name.trim()) {
			return res.status(400).json({ error: 'Ingredient name is required' });
		}

		// Normalize name (trim & lowercase) to prevent duplicate names
		const normalizedName = name.trim().toLowerCase();

		// Check if ingredient already exists
		const existingIngredient = await Ingredient.findOne({
			where: { name: normalizedName },
		});

		if (existingIngredient) {
			return res.status(409).json({
				error: `Ingredient "${existingIngredient.name}" already exists`,
			});
		}

		// Create new ingredient
		const newIngredient = await Ingredient.create({
			name: normalizedName,
			calories,
			carbohydrates,
			protein,
			fats,
			fiber,
			sodium,
			sugar,
			calcium,
			iron,
			moisture,
			servingSize,
			image,
		});

		// console.log(`  Created new ingredient: ${newIngredient.name}`);
		return res.status(201).json(newIngredient);
	} catch (error) {
		console.error('  Error creating ingredient:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
});


module.exports = router;
