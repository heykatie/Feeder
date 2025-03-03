'use strict';

const { Sequelize, List, Recipe } = require('../models');

let options = {};
options.tableName = 'Lists';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {

		const recipes = await Recipe.findAll({ attributes: ['id'] });
		const recipeIds = recipes.map((recipe) => recipe.id);


		const getRandomRecipeId = () =>
			recipeIds.length
				? recipeIds[Math.floor(Math.random() * recipeIds.length)]
				: null;


		await List.bulkCreate(
			[
				{
					userId: 1,
					recipeId: getRandomRecipeId(),
					name: 'Weekly Dog Meals',
					type: 'shopping',
					notes: 'Plan for the next week’s meals.',
				},
				{
					userId: 1,
					recipeId: getRandomRecipeId(),
					name: 'Treat Ingredients',
					type: 'shopping',
					notes: 'Ingredients for homemade dog treats.',
				},
				{
					userId: 2,
					recipeId: null, 
					name: 'Fresh Ingredients',
					type: 'shopping',
					notes: 'Vegetables and meats for healthy meals.',
				},
				{
					userId: 2,
					recipeId: getRandomRecipeId(),
					name: 'Holiday Special Meals',
					type: 'shopping',
					notes: 'Holiday meal prep for my pup!',
				},
				{
					userId: 3,
					recipeId: getRandomRecipeId(),
					name: 'Quick & Easy Meals',
					type: 'shopping',
					notes: 'Simple meal plans for busy days.',
				},
				{
					userId: 3,
					recipeId: getRandomRecipeId(),
					name: 'Raw Diet Essentials',
					type: 'shopping',
					notes: 'Essential items for a balanced raw diet.',
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(options, null, {});
	},
};
