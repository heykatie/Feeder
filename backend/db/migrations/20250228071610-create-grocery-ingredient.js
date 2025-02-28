'use strict';

let options = {};
options.tableName = 'GroceryIngredients';
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
			listId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Lists', key: 'id' },
				onDelete: 'CASCADE',
			},
			ingredientId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Ingredients', key: 'id' },
				onDelete: 'CASCADE',
			},
			quantity: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			checked: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
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