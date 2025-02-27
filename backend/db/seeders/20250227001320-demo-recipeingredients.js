'use strict';

let options = {};
options.tableName = 'RecipeIngredients';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			options,
			[
				// Chicken & Rice Bowl
				{ recipeId: 1, ingredientId: 1, quantity: '1 cup' }, // Chicken Breast
				{ recipeId: 1, ingredientId: 2, quantity: '1/2 cup' }, // Brown Rice

				// Peanut Butter Banana Bites
				{ recipeId: 2, ingredientId: 6, quantity: '1/2 cup' }, // Blueberries
				{ recipeId: 2, ingredientId: 8, quantity: '1/4 cup' }, // Carrots

				// Beef & Sweet Potato Stew
				{ recipeId: 3, ingredientId: 3, quantity: '1 cup' }, // Sweet Potato
				{ recipeId: 3, ingredientId: 1, quantity: '1/2 lb' }, // Chicken Breast

				// Salmon & Quinoa Bowl
				{ recipeId: 4, ingredientId: 4, quantity: '1 filet' }, // Salmon
				{ recipeId: 4, ingredientId: 2, quantity: '1/3 cup' }, // Brown Rice

				// Turkey & Pumpkin Mash
				{ recipeId: 5, ingredientId: 5, quantity: '1/2 cup' }, // Pumpkin
				{ recipeId: 5, ingredientId: 1, quantity: '1/2 lb' }, // Chicken Breast

				// Blueberry Oatmeal Cookies
				{ recipeId: 6, ingredientId: 6, quantity: '1/2 cup' }, // Blueberries
				{ recipeId: 6, ingredientId: 7, quantity: '1 cup' }, // Oatmeal

				// Lamb & Brown Rice Dinner
				{ recipeId: 7, ingredientId: 2, quantity: '1/2 cup' }, // Brown Rice
				{ recipeId: 7, ingredientId: 1, quantity: '1/2 lb' }, // Chicken Breast

				// Apple Carrot Pupcakes
				{ recipeId: 8, ingredientId: 8, quantity: '1/3 cup' }, // Carrots
				{ recipeId: 8, ingredientId: 7, quantity: '1/2 cup' }, // Oatmeal

				// Chicken Liver Training Treats
				{ recipeId: 9, ingredientId: 9, quantity: '1/2 lb' }, // Chicken Liver

				// Puppy Meatballs
				{ recipeId: 10, ingredientId: 1, quantity: '1/2 lb' }, // Chicken Breast
				{ recipeId: 10, ingredientId: 7, quantity: '1/4 cup' }, // Oatmeal

				// Coconut Yogurt Bites
				{ recipeId: 11, ingredientId: 10, quantity: '1/2 cup' }, // Greek Yogurt
				{ recipeId: 11, ingredientId: 12, quantity: '1 tbsp' }, // Coconut Oil

				// Vegetable Broth for Hydration
				{ recipeId: 12, ingredientId: 12, quantity: '1 cup' }, // Vegetable Broth
				{ recipeId: 12, ingredientId: 8, quantity: '1/3 cup' }, // Carrots
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
