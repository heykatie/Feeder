'use strict';
const { Model, Ingredient, RecipeIngredient } = require('sequelize');
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
		},
		{
			sequelize,
			modelName: 'Recipe',
		}
  );
  return Recipe;
};