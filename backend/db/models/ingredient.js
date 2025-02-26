'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Ingredient extends Model {
		static associate(models) {
			Ingredient.belongsToMany(models.Recipe, {
				through: models.RecipeIngredient,
				foreignKey: 'ingredientId',
			});
		}
	}
	Ingredient.init(
		{
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
		},
		{
			sequelize,
			modelName: 'Ingredient',
		}
	);
	return Ingredient;
};
