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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/chicken-and-rice-for-dogs-lead-683x1024.jpg',
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
					userId: 3,
					title: 'Peanut Butter Banana Bites',
					description:
						'Frozen treats with peanut butter and banana, perfect for a snack.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/edit-frozen-pb-chocolate-banana-bites-3.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/20241120105039-beef-20-26-20sp-20v1.webp',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/8110444-fe18d867dddf4b7ca90ac3c05dff42a0.webp',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/turkey-meatballs-in-pumpkin-sage-sauce_thecozyapron_1.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/product-blueberries-and-cream-scones-with-sweet-glaze-the-whistling-kettle-15766113812535.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/20200412_075928.webp',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Apple-Carrot-Muffins-14-1966x2048.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/liver-treat-recipe-for-dogs.webp',
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
					userId: 1,
					title: 'Puppy Meatballs',
					description:
						'Soft, bite-sized meatballs perfect for young or senior dogs.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/meatballs-for-dogs.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/DSCF9846.jpg',
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
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Veggie-Broth-NF-6-500x500.jpg',
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
				{
					userId: 1,
					title: 'Duck & Pumpkin Feast',
					description:
						'A rich and flavorful meal with duck and pumpkin, packed with nutrients.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/DSACAWholesomeGrainsDuckLIDPDPs6_500x500.jpeg',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Cook duck breast in a skillet until fully done.',
						'Mash cooked pumpkin and mix with the duck.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					notes: 'Rich in protein and vitamins.',
				},
				{
					userId: 2,
					title: 'Rabbit & Carrot Medley',
					description:
						'A lean rabbit meat dish with carrots, ideal for sensitive stomachs.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/rabbit-veggie-freeze-dried-raw-dog-food-447709.webp',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Slow cook rabbit meat until tender.',
						'Steam carrots until soft, then mix with shredded rabbit.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 15,
					cookTime: 25,
					totalTime: 40,
					difficulty: 'Easy',
					rating: 4,
					isPublic: true,
					notes: 'High in lean protein.',
				},
				{
					userId: 3,
					title: 'Salmon & Sweet Potato Mash',
					description:
						'A salmon dish with sweet potatoes and omega-3 benefits.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/cajun-salmon-sweet-potato-broccoli-recipe-2.webp',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Bake salmon fillet until fully cooked.',
						'Boil sweet potatoes and mash them.',
						'Mix salmon flakes with mashed sweet potatoes.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					notes: 'Packed with omega-3 for a shiny coat.',
				},
				{
					userId: 1,
					title: 'Ground Chicken & Rice Delight',
					description:
						'A simple and nutritious ground chicken dish with rice.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/139453-Lucky-and-Rippys-Favorite-Dog-Food-ddmfs-117-4x3-1-b8b49bf3211b40eb9d91590445ca56e2.webp',
					category: 'Balanced Meal',
					instructions: JSON.stringify([
						'Cook ground chicken in a pan until fully done.',
						'Prepare brown rice separately.',
						'Mix chicken and rice, then cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Easy',
					rating: 4,
					isPublic: true,
					notes: 'Great for digestion.',
				},
				{
					userId: 2,
					title: 'Pork & Apple Stew',
					description:
						'A hearty stew with pork and apples for natural sweetness.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Pork-and-Apple-Stew-Dog-Food-Recipe.webp',
					category: 'Stew',
					instructions: JSON.stringify([
						'Brown ground pork in a pot.',
						'Add diced apples and a small amount of water.',
						'Simmer until apples are soft and flavors are mixed.',
						'Cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 25,
					totalTime: 35,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					notes: 'Rich in iron and natural sweetness.',
				},
				{
					userId: 1,
					title: 'Raw Beef & Organ Mix',
					description:
						'A high-protein raw mix with beef, liver, and veggies.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/c1f88377e14093e09eb467291f033dea.png',
					category: 'Raw Diet',
					instructions: JSON.stringify([
						'Chop beef, liver, and kidney into bite-sized pieces.',
						'Mix with shredded carrots and spinach.',
						'Serve raw or lightly seared for dogs new to raw diets.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 0,
					totalTime: 10,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					notes: 'Ensure organ meats make up 10-15% of the total meal.',
				},
				{
					userId: 2,
					title: 'Turkey & Sweet Potato Mash',
					description:
						'A cooked turkey and sweet potato dish, easy to digest.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Turkey-11-728x546.webp',
					category: 'Cooked Diet',
					instructions: JSON.stringify([
						'Cook ground turkey in a pan until fully done.',
						'Boil and mash sweet potatoes.',
						'Mix together and let cool before serving.',
					]),
					servings: 2,
					prepTime: 15,
					cookTime: 20,
					totalTime: 35,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					notes: 'Great for dogs with sensitive stomachs.',
				},
				{
					userId: 3,
					title: 'Duck & Quinoa Bowl',
					description: 'A hypoallergenic meal with duck and quinoa.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Duck-Dog-Food-Recipe-Photo.jpg',
					category: 'Limited Ingredient',
					instructions: JSON.stringify([
						'Cook duck breast in a skillet until golden brown.',
						'Cook quinoa separately according to package instructions.',
						'Mix and let cool before serving.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Medium',
					rating: 4,
					isPublic: true,
					notes: 'Duck is a great protein for dogs with food allergies.',
				},
				{
					userId: 1,
					title: 'Rabbit & Egg Power Bowl',
					description: 'A lean and high-protein rabbit dish with eggs.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/bbdd79c3f46568cf325da6d0d9188a49.png',
					category: 'High-Protein',
					instructions: JSON.stringify([
						'Slow cook rabbit meat until tender.',
						'Boil eggs and chop into small pieces.',
						'Mix and let cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 30,
					totalTime: 40,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					notes: 'Great for active dogs that need extra protein.',
				},
				{
					userId: 2,
					title: 'Salmon & Green Bean Light Meal',
					description: 'A lean salmon meal with fiber-rich green beans.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/One-Sheet-Pan-Salmon-Green-Beans-Clean-Eating-Recipe-Clean-Food-Crush.jpg',
					category: 'Weight Management',
					instructions: JSON.stringify([
						'Bake salmon fillet until fully cooked.',
						'Steam green beans until soft.',
						'Mix together and let cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Easy',
					rating: 4,
					isPublic: true,
					notes: 'Low in fat and high in fiber to keep dogs full.',
				},
				{
					userId: 3,
					title: 'Soft Chicken & Pumpkin Puree',
					description: 'A soft, easy-to-eat meal for senior dogs.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/crema-de-pollo-y-calabaza_version_1670579152.jpg',
					category: 'Senior Diet',
					instructions: JSON.stringify([
						'Boil chicken until tender and shred finely.',
						'Mix with pureed pumpkin.',
						'Serve warm and soft for easy chewing.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					notes: 'Pumpkin aids digestion and is gentle on the stomach.',
				},
				{
					userId: 1,
					title: 'Puppy Power Meatballs',
					description: 'Small, nutritious meatballs for growing puppies.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/pork-meatballs-featured-2022.jpg',
					category: 'Puppy Diet',
					instructions: JSON.stringify([
						'Mix ground chicken, oats, and egg in a bowl.',
						'Roll into small meatballs and bake at 350°F for 15 minutes.',
						'Let cool before serving.',
					]),
					servings: 4,
					prepTime: 10,
					cookTime: 15,
					totalTime: 25,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					notes: 'Packed with protein and healthy fats for growing pups.',
				},
				{
					userId: 1,
					title: 'Salmon & Tuna Delight',
					description:
						'A protein-rich meal with salmon and tuna for cats.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/exquisite-seafood-delight-fresh-salmon-red-tuna-sole-fish-chunks-garnished-wooden-plate_1000124-253198.jpg',
					category: 'Cat Balanced Meal',
					instructions: JSON.stringify([
						'Bake salmon until fully cooked.',
						'Mix with canned tuna and a small amount of fish broth.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 10,
					cookTime: 15,
					totalTime: 25,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'Packed with omega-3 for a healthy coat.',
				},
				{
					userId: 2,
					title: 'Chicken & Liver Pâté',
					description: 'A smooth and tasty chicken pâté for cats.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/online_culinary_school_chicken_liver_pate-1.jpg',
					category: 'Cat Soft Food',
					instructions: JSON.stringify([
						'Boil chicken breast and liver until fully cooked.',
						'Blend with a small amount of chicken broth until smooth.',
						'Serve chilled or at room temperature.',
					]),
					servings: 3,
					prepTime: 15,
					cookTime: 20,
					totalTime: 35,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'Great for cats who prefer soft meals.',
				},
				{
					userId: 3,
					title: 'Tuna & Egg Scramble',
					description: 'A simple tuna and egg scramble for cats.',
					imageUrl:
						'https://hiphipgourmet.com/wp-content/uploads/2023/07/20230617_161706-01-1-750x500.jpeg',
					category: 'Cat Cooked Diet',
					instructions: JSON.stringify([
						'Scramble an egg in a pan over low heat.',
						'Mix in canned tuna and stir gently.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 5,
					cookTime: 5,
					totalTime: 10,
					difficulty: 'Easy',
					rating: 4,
					isPublic: true,
					species: 'cat',
					notes: 'A quick and easy meal for cats.',
				},
				{
					userId: 1,
					title: 'Sardine & Pumpkin Mix',
					description:
						'A nutritious sardine mix with pumpkin for digestion.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/toasty-pumpkin-chickpea-fritters-IMG_4323-3.jpg',
					category: 'Cat Limited Ingredient',
					instructions: JSON.stringify([
						'Mash canned sardines in a bowl.',
						'Mix with pureed pumpkin.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 5,
					cookTime: 0,
					totalTime: 5,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'Great for digestion and hairball prevention.',
				},
				{
					userId: 2,
					title: 'Turkey & Green Bean Feast',
					description:
						'A turkey-based meal with added fiber from green beans.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Ground-Turkey-and-Green-Bean-Stir-Fry-Photo2-1097x1536.webp',
					category: 'Cat Balanced Meal',
					instructions: JSON.stringify([
						'Cook ground turkey in a pan until fully done.',
						'Steam and finely chop green beans.',
						'Mix and let cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'Rich in lean protein and fiber.',
				},
				{
					userId: 3,
					title: 'Rabbit & Blueberry Medley',
					description:
						'A lean rabbit meal with antioxidant-rich blueberries.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Blueberry-Thyme-Red-Wine-Reduction-Featured-1.jpg',
					category: 'Cat High-Protein',
					instructions: JSON.stringify([
						'Slow cook rabbit meat until tender.',
						'Mix with mashed blueberries.',
						'Let cool before serving.',
					]),
					servings: 2,
					prepTime: 15,
					cookTime: 25,
					totalTime: 40,
					difficulty: 'Medium',
					rating: 4,
					isPublic: true,
					species: 'cat',
					notes: 'Perfect for active cats needing lean protein.',
				},
				{
					userId: 3,
					title: 'Salmon Skin & Rice Treats',
					description: 'Crunchy salmon skin treats with brown rice.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/salmon-skin-bowls-2.jpg',
					category: 'Cat Treats',
					instructions: JSON.stringify([
						'Bake salmon skin until crispy.',
						'Mix with cooked brown rice.',
						'Let cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 30,
					totalTime: 40,
					difficulty: 'Medium',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'High in omega-3 for a shiny coat.',
				},
				{
					userId: 2,
					title: 'Beef & Liver Mousse',
					description: 'A soft and easy-to-eat mousse for senior cats.',
					imageUrl:
						'https://souschef-files.s3.us-west-1.amazonaws.com/seeds/Classic-Beef-Liver-Pate-featured-500x500.jpg',
					category: 'Cat Senior Diet',
					instructions: JSON.stringify([
						'Cook beef and liver until soft.',
						'Blend with a small amount of broth until smooth.',
						'Let cool before serving.',
					]),
					servings: 3,
					prepTime: 10,
					cookTime: 20,
					totalTime: 30,
					difficulty: 'Easy',
					rating: 5,
					isPublic: true,
					species: 'cat',
					notes: 'Great for older cats with sensitive teeth.',
				},
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
