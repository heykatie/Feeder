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
				{ recipeId: 1, ingredientId: 1, quantity: 1, measurementId: 4 }, // 1 lb Chicken Breast
				{ recipeId: 1, ingredientId: 2, quantity: 1, measurementId: 1 }, // 1 cup Brown Rice
				{ recipeId: 1, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots

				// Peanut Butter Banana Bites
				{ recipeId: 2, ingredientId: 6, quantity: 0.5, measurementId: 1 }, // 1/2 cup Blueberries
				{ recipeId: 2, ingredientId: 10, quantity: 0.5, measurementId: 1 }, // 1/2 cup Greek Yogurt
				{ recipeId: 2, ingredientId: 7, quantity: 0.25, measurementId: 1 }, // 1/4 cup Oatmeal

				// Beef & Sweet Potato Stew
				{ recipeId: 3, ingredientId: 3, quantity: 1, measurementId: 1 }, // 1 cup Sweet Potato
				{ recipeId: 3, ingredientId: 11, quantity: 0.5, measurementId: 4 }, // 1/2 lb Ground Beef
				{ recipeId: 3, ingredientId: 12, quantity: 2, measurementId: 1 }, // 2 cups Vegetable Broth

				// Salmon & Quinoa Bowl
				{ recipeId: 4, ingredientId: 4, quantity: 1, measurementId: 6 }, // 1 filet Salmon
				{ recipeId: 4, ingredientId: 2, quantity: 0.75, measurementId: 1 }, // 3/4 cup Brown Rice
				{ recipeId: 4, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots

				// Turkey & Pumpkin Mash
				{ recipeId: 5, ingredientId: 5, quantity: 1, measurementId: 1 }, // 1 cup Pumpkin
				{ recipeId: 5, ingredientId: 12, quantity: 1, measurementId: 4 }, // 1 lb Ground Turkey
				{ recipeId: 5, ingredientId: 7, quantity: 0.5, measurementId: 1 }, // 1/2 cup Oatmeal

				// Blueberry Oatmeal Cookies
				{ recipeId: 6, ingredientId: 6, quantity: 1, measurementId: 1 }, // 1 cup Blueberries
				{ recipeId: 6, ingredientId: 7, quantity: 1, measurementId: 1 }, // 1 cup Oatmeal
				{ recipeId: 6, ingredientId: 12, quantity: 2, measurementId: 2 }, // 2 tbsp Honey

				// Lamb & Brown Rice Dinner
				{ recipeId: 7, ingredientId: 2, quantity: 1, measurementId: 1 }, // 1 cup Brown Rice
				{ recipeId: 7, ingredientId: 11, quantity: 1, measurementId: 4 }, // 1 lb Ground Lamb
				{ recipeId: 7, ingredientId: 12, quantity: 1, measurementId: 1 }, // 1 cup Vegetable Broth

				// Apple Carrot Pupcakes
				{ recipeId: 8, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots
				{ recipeId: 8, ingredientId: 4, quantity: 1, measurementId: 1 }, // 1 cup Apple (grated)
				{ recipeId: 8, ingredientId: 7, quantity: 0.5, measurementId: 1 }, // 1/2 cup Oatmeal

				// Chicken Liver Training Treats
				{ recipeId: 9, ingredientId: 9, quantity: 0.5, measurementId: 4 }, // 1/2 lb Chicken Liver
				{ recipeId: 9, ingredientId: 7, quantity: 0.25, measurementId: 1 }, // 1/4 cup Oatmeal

				// Puppy Meatballs
				{ recipeId: 10, ingredientId: 1, quantity: 0.5, measurementId: 4 }, // 1/2 lb Chicken Breast
				{ recipeId: 10, ingredientId: 7, quantity: 0.25, measurementId: 1 }, // 1/4 cup Oatmeal
				{ recipeId: 10, ingredientId: 5, quantity: 1, measurementId: 3 }, // 1 egg

				// Coconut Yogurt Bites
				{ recipeId: 11, ingredientId: 10, quantity: 1, measurementId: 1 }, // 1 cup Greek Yogurt
				{ recipeId: 11, ingredientId: 3, quantity: 1, measurementId: 2 }, // 1 tbsp Coconut Oil
				{ recipeId: 11, ingredientId: 6, quantity: 0.5, measurementId: 1 }, // 1/2 cup Blueberries

				// Vegetable Broth for Hydration
				{ recipeId: 12, ingredientId: 2, quantity: 2, measurementId: 1 }, // 2 cups Vegetable Broth
				{ recipeId: 12, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots
				{ recipeId: 12, ingredientId: 9, quantity: 0.5, measurementId: 1 }, // 1/2 cup Celery
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
