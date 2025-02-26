'use strict';

let options = {};
options.tableName = 'Pets';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			options,
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Users',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				name: {
					type: Sequelize.STRING(100),
					allowNull: false,
				},
				species: {
					type: Sequelize.ENUM('cat', 'dog'),
					allowNull: false,
				},
				breed: {
					type: Sequelize.STRING(200),
				},
				age: {
					type: Sequelize.INTEGER,
				},
				weight: {
					type: Sequelize.DECIMAL,
				},
				allergies: {
					type: Sequelize.TEXT,
				},
				notes: {
					type: Sequelize.TEXT,
				},
				image: {
					type: Sequelize.TEXT,
				},
				birthday: {
					type: Sequelize.DATEONLY,
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable(options);
	},
};
