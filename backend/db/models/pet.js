'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Pet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Pet.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
		}
	}

	Pet.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			species: {
				type: DataTypes.ENUM('cat', 'dog'),
				allowNull: false,
			},
			breed: {
				type: DataTypes.STRING(200),
			},
			age: {
				type: DataTypes.INTEGER,
				validate: {
					min: 0,
				},
			},
			weight: {
				type: DataTypes.DECIMAL,
				validate: {
					min: 0,
				},
			},
			allergies: {
				type: DataTypes.TEXT,
			},
			notes: {
				type: DataTypes.TEXT,
			},
			image: {
				type: DataTypes.TEXT,
			},
			birthday: {
				type: DataTypes.DATEONLY,
			},
		},
		{
			sequelize,
			modelName: 'Pet',
		}
	);

	return Pet;
};
