'use strict';

const { Sequelize, Recipe } = require('../models');
const fs = require('fs');
const path = require('path');
const { generatePutPresignedUrl, deleteFromS3 } = require('../../utils/s3');

let options = {};
options.tableName = 'Recipes';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

async function uploadImagesToS3() {
	const images = [
		'chicken-and-rice-for-dogs-lead-683x1024.jpg',
		'edit-frozen-pb-chocolate-banana-bites-3.jpg',
		'turkey_pumpkin.jpg',
		'blueberry_oat_cookies.jpg',
		'lamb_rice_dinner.jpg',
		'apple_carrot_pupcakes.jpg',
		'chicken_liver_treats.jpg',
		'rabbit_blueberry_medley.jpg',
		'salmon-skin-bowls-2.jpg',
		'Classic-Beef-Liver-Pate-featured-500x500.jpg',
	];

	const uploads = images.map(async (filename) => {
		const localPath = `./seed-images/${filename}`;
		const key = `recipes/${filename}`;
		const existingUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

		// If image exists in S3, return existing URL
		try {
			return { [filename]: existingUrl };
		} catch (error) {
			console.log(`Uploading ${filename} to S3...`);
		}

		// Read local file and upload if not present
		const fileBuffer = fs.readFileSync(localPath);
		const uploadUrl = await generatePutPresignedUrl(key, 'image/jpeg');

		await fetch(uploadUrl, {
			method: 'PUT',
			headers: { 'Content-Type': 'image/jpeg' },
			body: fileBuffer,
		});

		return { [filename]: existingUrl };
	});

	// Resolve all uploads
	const imageMappings = await Promise.all(uploads);
	return Object.assign({}, ...imageMappings);
}

module.exports = {
	async up(queryInterface, Sequelize) {
		const recipeImages = await uploadImagesToS3();

		await Recipe.bulkCreate(
			[
				{
					userId: 1,
					title: 'Chicken & Rice Bowl',
					description:
						'A simple, balanced meal with lean chicken and brown rice for dogs.',
					imageUrl:
						recipeImages['chicken-and-rice-for-dogs-lead-683x1024.jpg'],

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
						recipeImages['edit-frozen-pb-chocolate-banana-bites-3.jpg'],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
					imageUrl: recipeImages[''],

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
				const imagesToDelete = [
					'recipes/chicken_rice.jpg',
					'recipes/pb_banana_bites.jpg',
					'recipes/beef_liver_mousse.jpg',
					'recipes/salmon_quinoa.jpg',
				];
		await Promise.all(imagesToDelete.map((key) => deleteFromS3(key)));
		await queryInterface.bulkDelete(options, null, {});
	},
};
