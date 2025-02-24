'use strict';

const { Model, Validator } = require('sequelize');
const validator = require('validator');
const PasswordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const pass = new PasswordValidator();

pass
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(100) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits() // Must have digits
	.has()
	.symbols()
	.has()
	.not()
	.spaces(); // Should not have spaces

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
			User.hasMany(models.Pet, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
    }
  }
  User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [1, 50],
					is: /^[a-zA-ZÀ-ÿ' -]+$/i,
				},
				set(value) {
					if (typeof value === 'string') {
						this.setDataValue('firstName', value.trim());
					}
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [1, 50],
					is: /^[a-zA-ZÀ-ÿ' -]+$/i,
				},
				set(value) {
					if (typeof value === 'string') {
						this.setDataValue('lastName', value.trim());
					}
				},
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
				set(value) {
					if (!value) {
						this.setDataValue('phone', null);
						return;
					}

					const trimmedValue = value.trim();

					if (/^\+\d{11,15}$/.test(trimmedValue)) {
						this.setDataValue('phone', trimmedValue);
						return;
					}

					try {
						const phoneNumber = parsePhoneNumberFromString(
							trimmedValue,
							'US'
						);
						if (phoneNumber?.isValid()) {
							this.setDataValue('phone', phoneNumber.format('E.164'));
						} else {
							throw new Error('Invalid phone number.');
						}
					} catch {
						throw new Error('Invalid phone number.');
					}
				},
			},
			birthday: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				// validate: {
				// 	isOldEnough(value) {
				// 		if (value) {
				// 			const age =
				// 				new Date().getFullYear() -
				// 				new Date(value).getFullYear();
				// 			if (age < 13)
				// 				throw new Error('Users must be at least 13 years old.');
				// 		}
				// 	},
				// },
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				set(value) {
					this.setDataValue('username', value.toLowerCase());
				},
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					},
				},
				indexes: [{ unique: true }],
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					len: [3, 256],
				},
				indexes: [{ unique: true }],
			},
			password: {
				type: DataTypes.VIRTUAL,
				validate: {
					isStrongPassword(value) {
						if (!pass.validate(value)) {
							throw new Error(
								'Password must meet strength requirements.'
							);
						}
					},
				},
			},
			hashedPassword: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [59, 72],
				},
			},
			avatarUrl: {
				type: DataTypes.TEXT,
				allowNull: true,
				get() {
					return (
						this.getDataValue('avatarUrl') ||
						process.env.DEFAULT_AVATAR_URL ||
						'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png'
					);
				},
				// defaultValue:
				// 	process.env.DEFAULT_AVATAR_URL ||
				// 	'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png',
			},
			bio: {
				type: DataTypes.TEXT,
				allowNull: true,
				validate: {
					len: [0, 500],
				},
			},
			theme: {
				type: DataTypes.ENUM('dark', 'light', 'system'),
				allowNull: false,
				defaultValue: process.env.DEFAULT_THEME || 'dark',
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
				},
				include: [{ model: sequelize.models.SousChef }],
			},
			hooks: {
				beforeCreate: async (user) => {
					if (user.password) {
						user.hashedPassword = await bcrypt.hash(user.password, 10);
					}
				},
				beforeUpdate: async (user) => {
					if (user.password) {
						user.hashedPassword = await bcrypt.hash(user.password, 10);
					}
				},
			},
		}
  );
	User.afterCreate(async (user, options) => {
		await sequelize.models.SousChef.create({
			userId: user.id,
			name: 'SousChef',
			level: 1,
			xp: 0,
			type: 'Starter Spoon',
			evoStage: 'Foraging Fledgling',
			imageUrl:
				'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef.png',
			animationUrl:
				'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef-animation.json',
		});
	});
  return User;
};