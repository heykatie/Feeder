'use strict';

const {
	List,
	Ingredient,
	Measurement,
	GroceryIngredient,
} = require('../models');

let options = {};
options.tableName = 'GroceryIngredients';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		// Fetch all lists created by demo users
		const lists = await List.findAll({ attributes: ['id', 'userId'] });

		// Fetch all ingredients
		const ingredients = await Ingredient.findAll({ attributes: ['id'] });

		// Fetch all measurements
		const measurements = await Measurement.findAll({ attributes: ['id'] });

		if (!lists.length || !ingredients.length) {
			console.error('No lists or ingredients found. Seeding aborted.');
			return;
		}

		// Function to get a random value from an array
		const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

		// Prepare grocery ingredient seed data
		const groceryIngredients = [];
		lists.forEach((list) => {
			// Assign 3-5 random ingredients per list
			const assignedIngredients = new Set();
			while (assignedIngredients.size < Math.floor(Math.random() * 3) + 3) {
				const ingredient = getRandom(ingredients);
				if (!assignedIngredients.has(ingredient.id)) {
					assignedIngredients.add(ingredient.id);
					groceryIngredients.push({
						listId: list.id,
						ingredientId: ingredient.id,
						quantity: (Math.random() * 5 + 1).toFixed(1), // Random quantity between 1.0 - 6.0
						measurementId: measurements.length
							? getRandom(measurements).id
							: null, // Assign measurement if available
						checked: Math.random() > 0.5, // Randomly mark some ingredients as checked
					});
				}
			}
		});

		// Bulk insert grocery ingredients
		await GroceryIngredient.bulkCreate(groceryIngredients, {
			validate: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(options, null, {});
	},
};
