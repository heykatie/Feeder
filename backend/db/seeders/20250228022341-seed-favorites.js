'use strict';

const { Recipe } = require('../models');

let options = {};
options.tableName = 'Favorites';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const recipes = await Recipe.findAll({ attributes: ['id'] });

		const favorites = [];

		const userIds = [1, 2, 3];

		recipes.forEach((recipe) => {
			userIds.forEach((userId) => {
				favorites.push({
					userId,
					recipeId: recipe.id,
				});
			});
		});

		return queryInterface.bulkInsert(options, favorites, { validate: true });
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete(options, null, {});
	},
};
