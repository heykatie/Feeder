'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RecipeIngredient extends Model {
		static associate(models) {
			RecipeIngredient.belongsTo(models.Measurement, {
				foreignKey: 'measurementId',
			});
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
				type: DataTypes.DECIMAL(10, 2),
				defaultValue: 1,
			},
			measurementId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: { model: 'Measurements', key: 'id' },
				onDelete: 'SET NULL',
			},
		},
		{
			sequelize,
			modelName: 'RecipeIngredient',
		}
	);
	return RecipeIngredient;
};
