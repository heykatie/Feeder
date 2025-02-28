'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroceryIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GroceryIngredient.belongsTo(models.List, { foreignKey: 'listId' });
      GroceryIngredient.belongsTo(models.Ingredient, {
        foreignKey: 'ingredientId',
      });
    }
  }
  GroceryIngredient.init(
		{
			listId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Lists', key: 'id' },
				onDelete: 'CASCADE',
			},
			ingredientId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Ingredients', key: 'id' },
				onDelete: 'CASCADE',
			},
			quantity: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			checked: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: 'GroceryIngredient',
		}
  );
  return GroceryIngredient;
};