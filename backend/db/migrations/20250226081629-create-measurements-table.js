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

		await queryInterface.bulkInsert(
			options,
			[
				{ name: 'cup', abbreviation: 'c', conversionFactor: 236.59 }, // More precise ml equivalent
				{
					name: 'tablespoon',
					abbreviation: 'tbsp',
					conversionFactor: 14.79,
				},
				{ name: 'teaspoon', abbreviation: 'tsp', conversionFactor: 4.93 }, // More precise
				{ name: 'ounce', abbreviation: 'oz', conversionFactor: 28.35 }, // Grams per ounce
				{ name: 'pound', abbreviation: 'lb', conversionFactor: 453.59 }, // Grams per pound
				{ name: 'gram', abbreviation: 'g', conversionFactor: 1 }, // Base unit
				{ name: 'kilogram', abbreviation: 'kg', conversionFactor: 1000 }, // 1kg = 1000g
				{ name: 'milliliter', abbreviation: 'ml', conversionFactor: 1 }, // Base unit
				{ name: 'liter', abbreviation: 'l', conversionFactor: 1000 }, // 1 liter = 1000 ml
				{ name: 'piece', abbreviation: 'pc', conversionFactor: null }, // Variable size
				{ name: 'slice', abbreviation: 'sl', conversionFactor: null }, // Variable thickness
				{ name: 'pinch', abbreviation: 'pinch', conversionFactor: 0.36 }, // Approx 0.36g salt/spices
				{ name: 'dash', abbreviation: 'dash', conversionFactor: 0.6 }, // Approx 0.6g dry or 0.92ml liquid
				{
					name: 'fluid ounce',
					abbreviation: 'fl oz',
					conversionFactor: 29.57,
				}, 
				{ name: 'clove', abbreviation: 'clv', conversionFactor: 5 }, // Approx 5g per garlic clove
				{ name: 'stick', abbreviation: 'stk', conversionFactor: 113 }, // 1 stick of butter ≈ 113g
				{ name: 'can', abbreviation: 'can', conversionFactor: null }, // Variable size (e.g., canned pumpkin)
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable(options);
	},
};
