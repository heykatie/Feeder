'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Ingredient extends Model {
		static associate(models) {
			Ingredient.belongsToMany(models.Recipe, {
				through: models.RecipeIngredient,
				as: 'Recipes',
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
			category: { type: DataTypes.STRING, allowNull: false },
			calories: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			carbohydrates: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			protein: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fats: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fiber: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			sodium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			sugar: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			calcium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			iron: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			moisture: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			servingSize: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: process.env.DEFAULT_FOOD_IMAGE_URL,
			},
		},
		{
			sequelize,
			modelName: 'Ingredient',
		}
	);
	return Ingredient;
};
