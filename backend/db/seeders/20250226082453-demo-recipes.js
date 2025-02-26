'use strict';

const { Sequelize } = require('../models');

let options = {};
options.tableName = 'Recipes';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			options,
			[
				{
					userId: 1,
					title: 'Chicken & Rice Bowl',
					description:
						'A simple, balanced meal with lean chicken and brown rice for dogs.',
					imageUrl: 'https://example.com/chicken-rice.jpg',
					category: 'Balanced Meal',
				},
				{
					userId: 1,
					title: 'Peanut Butter Banana Bites',
					description:
						'Frozen treats with peanut butter and banana, perfect for a snack.',
					imageUrl: 'https://example.com/peanut-banana.jpg',
					category: 'Treats',
				},
				{
					userId: 1,
					title: 'Beef & Sweet Potato Stew',
					description:
						'A hearty beef stew with sweet potatoes, packed with nutrients.',
					imageUrl: 'https://example.com/beef-stew.jpg',
					category: 'Stew',
				},
				{
					userId: 1,
					title: 'Salmon & Quinoa Bowl',
					description:
						'A protein-rich meal with omega-3 fatty acids for a shiny coat.',
					imageUrl: 'https://example.com/salmon-quinoa.jpg',
					category: 'Balanced Meal',
				},

				// Recipes by User 2
				{
					userId: 2,
					title: 'Turkey & Pumpkin Mash',
					description:
						'A delicious and easy-to-digest turkey meal with pumpkin for gut health.',
					imageUrl: 'https://example.com/turkey-pumpkin.jpg',
					category: 'Balanced Meal',
				},
				{
					userId: 2,
					title: 'Blueberry Oatmeal Cookies',
					description:
						'Crunchy, homemade dog cookies with blueberries and oats.',
					imageUrl: 'https://example.com/blueberry-cookies.jpg',
					category: 'Treats',
				},
				{
					userId: 2,
					title: 'Lamb & Brown Rice Dinner',
					description:
						'A rich lamb dish with brown rice, great for sensitive stomachs.',
					imageUrl: 'https://example.com/lamb-rice.jpg',
					category: 'Balanced Meal',
				},
				{
					userId: 2,
					title: 'Apple Carrot Pupcakes',
					description:
						'Mini cupcakes made with apples and carrots for a vitamin boost.',
					imageUrl: 'https://example.com/apple-carrot.jpg',
					category: 'Treats',
				},

				// Recipes by User 3
				{
					userId: 3,
					title: 'Chicken Liver Training Treats',
					description:
						'Soft and high-protein training treats made with chicken liver.',
					imageUrl: 'https://example.com/liver-treats.jpg',
					category: 'Training Treats',
				},
				{
					userId: 3,
					title: 'Puppy Meatballs',
					description:
						'Soft, bite-sized meatballs perfect for young or senior dogs.',
					imageUrl: 'https://example.com/puppy-meatballs.jpg',
					category: 'Soft Food',
				},
				{
					userId: 3,
					title: 'Coconut Yogurt Bites',
					description:
						'Frozen coconut yogurt treats to cool your pup on hot days.',
					imageUrl: 'https://example.com/coconut-yogurt.jpg',
					category: 'Frozen Treats',
				},
				{
					userId: 3,
					title: 'Vegetable Broth for Hydration',
					description:
						'A nutrient-rich vegetable broth for hydration and gut health.',
					imageUrl: 'https://example.com/veggie-broth.jpg',
					category: 'Soup & Broth',
				},
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
