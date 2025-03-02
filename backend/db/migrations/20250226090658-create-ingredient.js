'use strict';

let options = {};
options.tableName = 'Ingredients';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

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
				name: {
					type: Sequelize.STRING(255),
					allowNull: false,
					unique: true,
				},
				calories: {
					type: Sequelize.INTEGER,
					allowNull: true,
				},
				carbohydrates: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				protein: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				fats: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				fiber: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				sodium: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				sugar: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				calcium: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				iron: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				moisture: {
					type: Sequelize.FLOAT,
					allowNull: true,
				},
				servingSize: {
					type: Sequelize.STRING,
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
