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
				instructions: {
					type: Sequelize.TEXT,
					allowNull: false,
					defaultValue: '',
				},
				servings: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 1,
				},
				prepTime: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				cookTime: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				totalTime: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				difficulty: {
					type: Sequelize.ENUM('Easy', 'Medium', 'Hard'),
					allowNull: false,
					defaultValue: 'Easy',
				},
				rating: {
					type: Sequelize.INTEGER,
				},
				isPublic: {
					type: Sequelize.BOOLEAN,
					allowNull: false,
					defaultValue: true,
				},
				notes: {
					type: Sequelize.TEXT,
					allowNull: true,
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
    await queryInterface.dropTable(options.tableName, options);
  }
};