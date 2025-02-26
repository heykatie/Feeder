'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RecipeIngredient extends Model {
		static associate(models) {
			// No direct associations needed; belongs to both Recipe & Ingredient
		}
	}
	RecipeIngredient.init(
		{
			recipeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Recipes', key: 'id' },
			},
			ingredientId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Ingredients', key: 'id' },
			},
			quantity: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'RecipeIngredient',
		}
	);
	return RecipeIngredient;
};
