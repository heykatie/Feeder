'use strict';

let options = {};
options.tableName = 'Measurements';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(options, {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			abbreviation: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			conversionFactor: {
				type: Sequelize.FLOAT,
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
		}, options);

		// ✅ Seed common measurements
		await queryInterface.bulkInsert(
			options,
			[
				{ name: 'cup', abbreviation: 'c', conversionFactor: 240 },
				{ name: 'tablespoon', abbreviation: 'tbsp', conversionFactor: 15 },
				{ name: 'teaspoon', abbreviation: 'tsp', conversionFactor: 5 },
				{ name: 'ounce', abbreviation: 'oz', conversionFactor: 28.35 },
				{ name: 'pound', abbreviation: 'lb', conversionFactor: 453.59 },
				{ name: 'gram', abbreviation: 'g', conversionFactor: 1 },
				{ name: 'kilogram', abbreviation: 'kg', conversionFactor: 1000 },
				{ name: 'milliliter', abbreviation: 'ml', conversionFactor: 1 },
				{ name: 'liter', abbreviation: 'l', conversionFactor: 1000 },
				{ name: 'piece', abbreviation: 'pc', conversionFactor: null },
				{ name: 'slice', abbreviation: 'sl', conversionFactor: null },
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(options);
	},
};
