'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Measurement.hasMany(models.GroceryIngredient, {
        foreignKey: 'measurementId',
        onDelete: 'SET NULL',
      });

      Measurement.hasMany(models.RecipeIngredient, {
        foreignKey: 'measurementId',
        onDelete: 'SET NULL',
      });
    }
  }
  Measurement.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			abbreviation: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			conversionFactor: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Measurement',
		}
  );
  return Measurement;
};
