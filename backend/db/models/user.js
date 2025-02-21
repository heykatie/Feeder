'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.SousChef, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
    }
  }
  User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
			},
			avatarUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue:
					'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png',
			},
			bio: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '',
			},
			theme: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'dark',
				validate: {
					isIn: [['dark', 'light']], // Ensures only 'dark' or 'light' are valid
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
  );
  return User;
};