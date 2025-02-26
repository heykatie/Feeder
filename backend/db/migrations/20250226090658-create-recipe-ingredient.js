'use strict';

let options = {};
options.tableName = 'RecipeIngredients';
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
				recipeId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: 'Recipes', key: 'id' },
					onDelete: 'CASCADE',
				},
				ingredientId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: 'Ingredients', key: 'id' },
					onDelete: 'CASCADE',
				},
				quantity: {
					type: Sequelize.STRING(100), // Example: "1 cup"
					allowNull: false,
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
