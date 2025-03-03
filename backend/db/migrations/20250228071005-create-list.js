'use strict';

let options = {};
options.tableName = 'Lists';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
				onDelete: 'CASCADE',
			},
			recipeId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: { model: 'Recipes', key: 'id' },
				onDelete: 'SET NULL',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'My List',
			},
			type: {
				type: Sequelize.ENUM('todo', 'shopping'),
				allowNull: false,
				defaultValue: 'shopping',
			},
			notes: {
				type: Sequelize.TEXT,
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
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options);
  }
};