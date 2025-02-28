'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			// define association here
			Favorite.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
			Favorite.belongsTo(models.Recipe, {
				foreignKey: 'recipeId',
				onDelete: 'CASCADE',
			});
    }
  }
  Favorite.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
				onDelete: 'CASCADE',
			},
			recipeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Recipes', key: 'id' },
				onDelete: 'CASCADE',
			},
		},
		{
			sequelize,
			modelName: 'Favorite',
		}
  );
  return Favorite;
};