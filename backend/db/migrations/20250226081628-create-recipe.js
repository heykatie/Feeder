'use strict';

let options = {};
options.tableName = 'Recipes';
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
				},
				title: {
					type: Sequelize.STRING(300),
					allowNull: false,
				},
				description: {
					type: Sequelize.TEXT,
				},
				imageUrl: {
					type: Sequelize.TEXT,
				},
				category: {
					type: Sequelize.STRING(100),
					allowNull: false,
					defaultValue: 'Uncategorized',
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
  }
};