'use strict';
const { Model, Ingredient, RecipeIngredient, Favorite } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			Recipe.belongsTo(models.User, { foreignKey: 'userId' });
			Recipe.belongsToMany(models.Ingredient, {
				through: models.RecipeIngredient,
				as: 'Ingredients',
				foreignKey: 'recipeId',
			});
			Recipe.belongsToMany(models.User, {
				through: models.Favorite,
				foreignKey: 'recipeId',
			});
			Recipe.hasMany(models.Favorite, {
				foreignKey: 'recipeId',
			});
    }
  }
  Recipe.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
			},
			title: {
				type: DataTypes.STRING(300),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			imageUrl: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			category: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: 'Uncategorized',
			},
			instructions: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '',
			},
			servings: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			prepTime: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			cookTime: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			totalTime: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			difficulty: {
				type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
				allowNull: false,
				defaultValue: 'Easy',
			},
			rating: {
				type: DataTypes.INTEGER,
				validate: {
					min: 0,
					max: 5,
				},
			},
			isPublic: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			notes: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Recipe',
			defaultScope: {
				include: [
					{
						model: sequelize.models.Ingredient,
						as: 'Ingredients', // Ensures ingredients are always included
						through: { attributes: ['quantity'] }, // Include quantity from join table
					},
				],
			},
		}
  );
  return Recipe;
};