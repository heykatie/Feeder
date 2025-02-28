const express = require('express');
const { Ingredient } = require('../../db/models');
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

module.exports = router;
