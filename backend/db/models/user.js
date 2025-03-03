'use strict';

const { Model, Validator } = require('sequelize');
const validator = require('validator');
const PasswordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const pass = new PasswordValidator();

pass
	.is()
	.min(8)
	.is()
	.max(100)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits()
	.has()
	.symbols()
	.has()
	.not()
	.spaces();

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
			User.belongsToMany(models.Recipe, {
				through: models.Favorite,
				foreignKey: 'userId',
			});
			User.hasMany(models.Favorite, {
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
						if (value && !pass.validate(value)) {
							throw new Error(
								'Password must be at least 8 characters with at least one uppercase, one lowercase, one number, and one symbol'
							);
						}
					},
				},
			},
			hashedPassword: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isRequiredForNonOAuth(value) {
						if (!this.googleId && !this.discordId && !value) {
							throw new Error(
								'Password is required for non-OAuth users'
							);
						}
					},
					notEmpty(value) {
						if (!this.googleId && !this.discordId && !value) {
							throw new Error(
								'Password cannot be empty for non-OAuth users'
							);
						}
					},
					len(value) {
						if (
							value &&
							!this.googleId &&
							!this.discordId &&
							(value.length < 59 || value.length > 72)
						) {
							throw new Error(
								'Hashed password must be a valid bcrypt hash'
							);
						}
					},
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
			googleId: {
				type: DataTypes.STRING,
				unique: true,
			},
			discordId: {
				type: DataTypes.STRING,
				unique: true,
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
					} else if (!user.googleId && !user.discordId && !user.hashedPassword) {
						throw new Error('Password is required for non-OAuth users');
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
