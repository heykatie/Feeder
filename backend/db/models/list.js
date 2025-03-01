'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.User, { foreignKey: 'userId' });
      List.hasMany(models.GroceryIngredient, {
			foreignKey: 'listId',
			as: 'Ingredients',
			});
			List.belongsTo(models.Recipe, { foreignKey: 'recipeId'});
    }
  }
  List.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
				onDelete: 'CASCADE',
			},
			recipeId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: { model: 'Recipes', key: 'id' },
				onDelete: 'SET NULL',
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'My List',
			},
			type: {
				type: DataTypes.ENUM('todo', 'shopping'),
				allowNull: false,
				defaultValue: 'shopping',
			},
			notes: {
				type: DataTypes.TEXT,
			},
		},
		{
			sequelize,
			modelName: 'List',
		}
  );
  return List;
};