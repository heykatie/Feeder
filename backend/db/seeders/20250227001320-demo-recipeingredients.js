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
				{ recipeId: 3, ingredientId: 5, quantity: 1, measurementId: 1 }, // 1 cup Pumpkin

				// Salmon & Quinoa Bowl
				{ recipeId: 4, ingredientId: 4, quantity: 1, measurementId: 6 }, // 1 filet Salmon
				{ recipeId: 4, ingredientId: 2, quantity: 0.75, measurementId: 1 }, // 3/4 cup Brown Rice
				{ recipeId: 4, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots
				{ recipeId: 4, ingredientId: 21, quantity: 1, measurementId: 1 }, // 1 cup Quinoa

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
				{ recipeId: 9, ingredientId: 5, quantity: 1, measurementId: 3 }, // 1 Egg

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
				{ recipeId: 12, ingredientId: 9, quantity: 0.5, measurementId: 1 }, // 1/2 cup Celery,
				{ recipeId: 12, ingredientId: 23, quantity: 0.5, measurementId: 1 }, // 1/2 cup Celery

				// Duck & Pumpkin Feast
				{ recipeId: 13, ingredientId: 14, quantity: 1, measurementId: 4 }, // 1 lb Duck Breast
				{ recipeId: 13, ingredientId: 5, quantity: 1, measurementId: 1 }, // 1 cup Pumpkin,

				// Rabbit & Carrot Medley
				{ recipeId: 14, ingredientId: 15, quantity: 1, measurementId: 4 }, // 1 lb Rabbit Meat
				{ recipeId: 14, ingredientId: 8, quantity: 0.5, measurementId: 1 }, // 1/2 cup Carrots,

				// Salmon & Sweet Potato Mash
				{ recipeId: 15, ingredientId: 4, quantity: 1, measurementId: 6 }, // 1 filet Salmon
				{ recipeId: 15, ingredientId: 3, quantity: 1, measurementId: 1 }, // 1 cup Sweet Potato,

				// Ground Chicken & Rice Delight
				{ recipeId: 16, ingredientId: 16, quantity: 1, measurementId: 4 }, // 1 lb Ground Chicken
				{ recipeId: 16, ingredientId: 2, quantity: 1, measurementId: 1 }, // 1 cup Brown Rice,

				// Pork & Apple Stew
				{ recipeId: 17, ingredientId: 17, quantity: 1, measurementId: 4 }, // 1 lb Ground Pork
				{ recipeId: 17, ingredientId: 18, quantity: 1, measurementId: 1 }, // 1 cup Apples,

				// Raw Beef & Organ Mix
				{ recipeId: 18, ingredientId: 19, quantity: 1, measurementId: 4 }, // 1 lb Raw Beef
				{ recipeId: 18, ingredientId: 20, quantity: 0.5, measurementId: 4 }, // 1/2 lb Beef Liver,

				// Turkey & Sweet Potato Mash
				{ recipeId: 19, ingredientId: 12, quantity: 1, measurementId: 4 }, // 1 lb Ground Turkey
				{ recipeId: 19, ingredientId: 3, quantity: 1, measurementId: 1 }, // 1 cup Sweet Potato,

				// Duck & Quinoa Bowl
				{ recipeId: 20, ingredientId: 14, quantity: 1, measurementId: 4 }, // 1 lb Duck Breast
				{ recipeId: 20, ingredientId: 21, quantity: 1, measurementId: 1 }, // 1 cup Quinoa,

				// Rabbit & Egg Power Bowl
				{ recipeId: 21, ingredientId: 15, quantity: 1, measurementId: 4 }, // 1 lb Rabbit Meat
				{ recipeId: 21, ingredientId: 5, quantity: 2, measurementId: 3 }, // 2 Eggs,
				{ recipeId: 21, ingredientId: 5, quantity: 2, measurementId: 3 }, // 2 Eggs

				// Salmon & Green Bean Light Meal
				{ recipeId: 22, ingredientId: 4, quantity: 1, measurementId: 6 }, // 1 filet Salmon
				{ recipeId: 22, ingredientId: 22, quantity: 1, measurementId: 1 }, // 1 cup Green Beans,

				// Soft Chicken & Pumpkin Puree
				{ recipeId: 23, ingredientId: 1, quantity: 1, measurementId: 4 }, // 1 lb Chicken Breast
				{ recipeId: 23, ingredientId: 5, quantity: 1, measurementId: 1 }, // 1 cup Pumpkin,

				// Puppy Power Meatballs
				{ recipeId: 24, ingredientId: 16, quantity: 1, measurementId: 4 }, // 1 lb Ground Chicken
				{ recipeId: 24, ingredientId: 7, quantity: 0.5, measurementId: 1 }, // 1/2 cup Oatmeal
				{ recipeId: 24, ingredientId: 5, quantity: 1, measurementId: 3 }, // 1 Egg
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
