'use strict';

let options = {};
options.tableName = 'Favorites';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(options, {
			id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Users', key: 'id' },
				onDelete: 'CASCADE',
			},
			recipeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Recipes', key: 'id' },
				onDelete: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable(options);
	},
};
