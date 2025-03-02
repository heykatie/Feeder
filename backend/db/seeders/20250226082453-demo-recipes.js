'use strict';

const { Sequelize, Recipe } = require('../models');

let options = {};
options.tableName = 'Recipes';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await Recipe.bulkCreate(
			[
				{
					userId: 1,
					title: 'Chicken & Rice Bowl',
					description:
						'A simple, balanced meal with lean chicken and brown rice for dogs.',
					imageUrl:
						'https://wearenotmartha.com/wp-content/uploads/chicken-and-rice-for-dogs-lead-683x1024.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 1,
					title: 'Peanut Butter Banana Bites',
					description:
						'Frozen treats with peanut butter and banana, perfect for a snack.',
					imageUrl:
						'https://unconventionalcooks.com/wp-content/uploads/2016/03/edit-frozen-pb-chocolate-banana-bites-3.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 1,
					title: 'Beef & Sweet Potato Stew',
					description:
						'A hearty beef stew with sweet potatoes, packed with nutrients.',
					imageUrl:
						'https://images.getrecipekit.com/20241120105039-beef-20-26-20sp-20v1.jpeg?aspect_ratio=16:9&quality=90&',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 1,
					title: 'Salmon & Quinoa Bowl',
					description:
						'A protein-rich meal with omega-3 fatty acids for a shiny coat.',
					imageUrl:
						'https://www.eatingwell.com/thmb/sPPzfWwOr90AtwtLJENVgHAebVc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8110444-fe18d867dddf4b7ca90ac3c05dff42a0.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 2,
					title: 'Turkey & Pumpkin Mash',
					description:
						'A delicious and easy-to-digest turkey meal with pumpkin for gut health.',
					imageUrl:
						'https://thecozyapron.com/wp-content/uploads/2022/11/turkey-meatballs-in-pumpkin-sage-sauce_thecozyapron_1.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 2,
					title: 'Blueberry Oatmeal Cookies',
					description:
						'Crunchy, homemade dog cookies with blueberries and oats.',
					imageUrl:
						'https://www.thewhistlingkettle.com/cdn/shop/products/product-blueberries-and-cream-scones-with-sweet-glaze-the-whistling-kettle-15766113812535.jpg?v=1675791417&width=1024',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 2,
					title: 'Lamb & Brown Rice Dinner',
					description:
						'A rich lamb dish with brown rice, great for sensitive stomachs.',
					imageUrl:
						'https://completelynourished.com/wp-content/uploads/2020/04/20200412_075928.jpg?w=1024',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 2,
					title: 'Apple Carrot Pupcakes',
					description:
						'Mini cupcakes made with apples and carrots for a vitamin boost.',
					imageUrl:
						'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/475786589_624014463514859_400421170891784191_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=zhCUe1wohd8Q7kNvgFGmtLf&_nc_oc=AdhtpxWzPpLq7cPLUj-tsSRuqFgd6cFyCuTHCxmToK2lH7Ww2YlcDQMuYENdXj5Rv3VT57ubmkqi3pMnyBVn-Mjk&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=ArKLFykN5_wclQE-zkPD-YW&oh=00_AYBxuyDJ4leHJvCuoQJribW1fQ1djkzLT-NPaCqiWAXrKg&oe=67CA0053',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 3,
					title: 'Chicken Liver Training Treats',
					description:
						'Soft and high-protein training treats made with chicken liver.',
					imageUrl:
						'https://www.bdws.co.uk/wp-content/uploads/liver-treat-recipe-for-dogs.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 3,
					title: 'Coconut Yogurt Bites',
					description:
						'Frozen coconut yogurt treats to cool your pup on hot days.',
					imageUrl:
						'https://www.pookspantry.com/wp-content/uploads/2022/05/meatballs-for-dogs.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
				{
					userId: 3,
					title: 'Vegetable Broth for Hydration',
					description:
						'A nutrient-rich vegetable broth for hydration and gut health.',
					imageUrl:
						'https://nutritionfacts.org/app/uploads/2018/01/Veggie-Broth-NF-6-500x500.jpg',
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
					rating: 4,
					isPublic: true,
					notes: 'give em a boop for me',
				},
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
