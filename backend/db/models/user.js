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
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [1, 50],
					is: /^[a-zA-ZÀ-ÿ' -]+$/i,
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					// isNumeric: true, // Ensures the value contains only numbers
					// len: [10, 15], // Allows between 10 to 15 digits for phone numbers
					validatePhone(value) {
						if (value) {
							try {
								// Remove spaces and other non-numeric characters except +
								let sanitizedValue = value.replace(/[^0-9+]/g, '');

								// Add default country code if missing
								// if (!sanitizedValue.startsWith('+')) {
								// 	sanitizedValue = `+1${sanitizedValue}`;
								// }

								// Parse and validate the phone number
								const phoneNumber = parsePhoneNumberFromString(
									sanitizedValue,
									'US'
								);

								if (
									value.length < 12 &&
									(!phoneNumber || !phoneNumber.isValid())
								) {
									throw new Error('Invalid phone number.');
								}

								// Return sanitized number for database storage
								return phoneNumber || sanitizedValue;
							} catch (err) {
								console.error(
									'Phone number validation error:',
									err.message
								);
								throw new Error('Invalid phone number.');
							}
						}
					},
					isEmptyStringAllowed(value) {
						if (value === '') {
							return; // Allow empty string
						}
						if (value && value.length < 10) {
							throw new Error('Phone must be a valid number.');
						}
					},
				},
			},
			birthday: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
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
					len: [60, 60],
				},
			},
			avatarUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue:
					'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png',
			},
			bio: {
				type: DataTypes.TEXT,
				allowNull: true,
				validate: {
					validateBio(value) {
						if (value && value.length > 500) {
							throw new Error('Bio must be at most 500 characters.');
						}
					},
				},
			},
			theme: {
				type: DataTypes.ENUM('dark', 'light', 'system'),
				allowNull: false,
				defaultValue: 'dark',
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
				},
			},
			hooks: {
				beforeCreate: async (user) => {
					if (user.password) {
						user.hashedPassword = await bcrypt.hash(user.password, 10); // Hash password before saving
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
  return User;
};