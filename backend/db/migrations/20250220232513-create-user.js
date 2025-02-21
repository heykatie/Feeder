'use strict';

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			options.tableName,
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				firstName: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				lastName: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				phone: {
					type: Sequelize.STRING(20),
					allowNull: true,
					validate: {
						isValidPhone(value) {
							if (!/^\+\d{1,3}\d{4,14}$/.test(value)) {
								throw new Error('Invalid phone number format.');
							}
						},
					},
				},
				birthday: {
					type: Sequelize.DATEONLY,
					allowNull: true,
				},
				username: {
					type: Sequelize.STRING(30),
					allowNull: false,
					unique: true,
				},
				email: {
					type: Sequelize.STRING(256),
					allowNull: false,
					unique: true,
				},
				hashedPassword: {
					type: Sequelize.STRING.BINARY,
					allowNull: false,
				},
				avatarUrl: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue:
						process.env.DEFAULT_AVATAR_URL ||
						'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png',
				},
				bio: {
					type: Sequelize.TEXT,
					allowNull: true,
					validate: {
						len: [0, 500],
					},
				},
				theme: {
					type: Sequelize.ENUM('dark', 'light', 'system'),
					allowNull: false,
					defaultValue: 'dark',
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			},
			options
		);
		await queryInterface.addIndex(
			'Users',
			[Sequelize.fn('LOWER', Sequelize.col('username'))],
			{
				unique: true,
				name: 'unique_username_lowercase_index',
			}
		);
	},
	async down(queryInterface, Sequelize) {
		// options.tableName = 'Users';
		await queryInterface.dropTable(options.tableName, options);
	},
};
