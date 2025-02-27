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
					instructions: JSON.stringify([
						'Boil chicken breast until fully cooked.',
						'Cook brown rice according to package instructions.',
						'Shred chicken and mix with rice.',
						'Let cool before serving to your dog.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 1,
					title: 'Peanut Butter Banana Bites',
					description:
						'Frozen treats with peanut butter and banana, perfect for a snack.',
					imageUrl: 'https://example.com/peanut-banana.jpg',
					category: 'Treats',
					instructions: JSON.stringify([
						'Mash bananas in a bowl until smooth.',
						'Mix in peanut butter and stir well.',
						'Spoon mixture into silicone molds.',
						'Freeze for at least 2 hours before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 1,
					title: 'Beef & Sweet Potato Stew',
					description:
						'A hearty beef stew with sweet potatoes, packed with nutrients.',
					imageUrl: 'https://example.com/beef-stew.jpg',
					category: 'Stew',
					instructions: JSON.stringify([
						'Brown the ground beef in a pan.',
						'Peel and chop sweet potatoes into small cubes.',
						'Add sweet potatoes to the pan with a small amount of water.',
						'Simmer until potatoes are soft and well mixed with beef.',
						'Cool before serving to your dog.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 1,
					title: 'Salmon & Quinoa Bowl',
					description:
						'A protein-rich meal with omega-3 fatty acids for a shiny coat.',
					imageUrl: 'https://example.com/salmon-quinoa.jpg',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Cook quinoa according to package instructions.',
						'Bake or steam salmon fillet until cooked through.',
						'Flake salmon and mix with quinoa.',
						'Let cool before serving to your dog.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 2,
					title: 'Turkey & Pumpkin Mash',
					description:
						'A delicious and easy-to-digest turkey meal with pumpkin for gut health.',
					imageUrl: 'https://example.com/turkey-pumpkin.jpg',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Cook ground turkey in a pan until no longer pink.',
						'Mix in plain canned pumpkin and stir.',
						'Let cool before serving to your dog.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 2,
					title: 'Blueberry Oatmeal Cookies',
					description:
						'Crunchy, homemade dog cookies with blueberries and oats.',
					imageUrl: 'https://example.com/blueberry-cookies.jpg',
					category: 'Treats',
					instructions: JSON.stringify([
						'Preheat oven to 350°F (175°C).',
						'Mix oats, flour, and mashed blueberries in a bowl.',
						'Roll dough into small cookie shapes and place on a baking sheet.',
						'Bake for 15-20 minutes or until golden brown.',
						'Let cool before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 2,
					title: 'Lamb & Brown Rice Dinner',
					description:
						'A rich lamb dish with brown rice, great for sensitive stomachs.',
					imageUrl: 'https://example.com/lamb-rice.jpg',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Cook ground lamb in a pan until fully browned.',
						'Cook brown rice separately according to package instructions.',
						'Mix lamb with brown rice and let cool before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 2,
					title: 'Apple Carrot Pupcakes',
					description:
						'Mini cupcakes made with apples and carrots for a vitamin boost.',
					imageUrl: 'https://example.com/apple-carrot.jpg',
					category: 'Treats',
					instructions: JSON.stringify([
						'Preheat oven to 350°F (175°C).',
						'Grate carrots and dice apples into small pieces.',
						'Mix carrots, apples, oat flour, and an egg in a bowl.',
						'Pour mixture into mini cupcake tins.',
						'Bake for 20 minutes and let cool before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 3,
					title: 'Chicken Liver Training Treats',
					description:
						'Soft and high-protein training treats made with chicken liver.',
					imageUrl: 'https://example.com/liver-treats.jpg',
					category: 'Training Treats',
					instructions: JSON.stringify([
						'Blend chicken liver in a food processor until smooth.',
						'Spread onto a baking sheet and bake at 350°F (175°C) for 15 minutes.',
						'Let cool, then cut into small training-sized pieces.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 3,
					title: 'Puppy Meatballs',
					description:
						'Soft, bite-sized meatballs perfect for young or senior dogs.',
					imageUrl: 'https://example.com/puppy-meatballs.jpg',
					category: 'Soft Food',
					instructions: JSON.stringify([
						'Preheat oven to 350°F (175°C).',
						'Mix ground chicken with egg and breadcrumbs.',
						'Roll into small meatballs and place on a baking sheet.',
						'Bake for 15-20 minutes, let cool before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 3,
					title: 'Coconut Yogurt Bites',
					description:
						'Frozen coconut yogurt treats to cool your pup on hot days.',
					imageUrl: 'https://example.com/coconut-yogurt.jpg',
					category: 'Frozen Treats',
					instructions: JSON.stringify([
						'Mix unsweetened coconut yogurt with mashed banana.',
						'Pour mixture into silicone molds or an ice cube tray.',
						'Freeze for at least 3 hours before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
				{
					userId: 3,
					title: 'Vegetable Broth for Hydration',
					description:
						'A nutrient-rich vegetable broth for hydration and gut health.',
					imageUrl: 'https://example.com/veggie-broth.jpg',
					category: 'Soup & Broth',
					instructions: JSON.stringify([
						'Simmer chopped carrots, celery, and parsley in water for 1 hour.',
						'Strain the broth and let cool completely before serving.',
					]),
					servings: 3,
					prepTime: 30,
					cookTime: 15,
					totalTime: 45,
					difficulty: 'Medium',
					likesCount: 10,
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me'
				},
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
