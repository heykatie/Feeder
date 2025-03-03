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

		const lists = await List.findAll({ attributes: ['id', 'userId'] });


		const ingredients = await Ingredient.findAll({ attributes: ['id'] });


		const measurements = await Measurement.findAll({ attributes: ['id'] });

		if (!lists.length || !ingredients.length) {
			console.error('No lists or ingredients found. Seeding aborted.');
			return;
		}


		const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];


		const groceryIngredients = [];
		lists.forEach((list) => {

			const assignedIngredients = new Set();
			while (assignedIngredients.size < Math.floor(Math.random() * 3) + 3) {
				const ingredient = getRandom(ingredients);
				if (!assignedIngredients.has(ingredient.id)) {
					assignedIngredients.add(ingredient.id);
					groceryIngredients.push({
						listId: list.id,
						ingredientId: ingredient.id,
						quantity: (Math.random() * 5 + 1).toFixed(1),
						measurementId: measurements.length
							? getRandom(measurements).id
							: null,
						checked: Math.random() > 0.5,
					});
				}
			}
		});


		await GroceryIngredient.bulkCreate(groceryIngredients, {
			validate: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(options, null, {});
	},
};
