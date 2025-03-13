'use strict';

let options = {};
options.tableName = 'Ingredients';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			options,
			[
				{
					name: 'Chicken Breast',
					category: 'Meats',
					calories: 165,
					carbohydrates: 0,
					protein: 31,
					fats: 3.6,
					fiber: 0,
					sodium: 74,
					sugar: 0,
					calcium: 5,
					iron: 0.9,
					moisture: 69,
					image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGoybGc2YWd5bW44bjJhZWFzbzJyN2k1N3NqZHhrMWs4bTFpazNpYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vZ4b5aFw6M6eesYMpe/giphy.gif',
					servingSize: '100g', // Standard nutrition reference
				},
				{
					name: 'Brown Rice',
					category: 'Grains',
					calories: 215,
					carbohydrates: 45,
					protein: 5,
					fats: 1.6,
					fiber: 3.5,
					sodium: 10,
					sugar: 0.4,
					calcium: 10,
					iron: 0.8,
					moisture: 12,
					image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGdybHMxdjVsdzNqeWI4Z3FuOWt5dTNlMXFqaWgxNWJ1aDV1MWpubyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UXg5N4aA7xUeXUWIy8/giphy.gif',
					servingSize: '1 cup cooked (195g)',
				},
				{
					name: 'Sweet Potato',
					category: 'Vegetables',
					calories: 86,
					carbohydrates: 20.1,
					protein: 1.6,
					fats: 0.1,
					fiber: 3,
					sodium: 55,
					sugar: 4.2,
					calcium: 30,
					iron: 0.6,
					moisture: 77,
					image: 'https://art.pixilart.com/dbeae09d1cae603.gif',
					servingSize: '1 medium (114g)',
				},
				{
					name: 'Salmon',
					category: 'Seafood',
					calories: 206,
					carbohydrates: 0,
					protein: 22,
					fats: 13,
					fiber: 0,
					sodium: 59,
					sugar: 0,
					calcium: 9,
					iron: 0.5,
					moisture: 64,
					image: 'https://img1.picmix.com/output/stamp/normal/4/0/1/3/2613104_c30d0.gif',
					servingSize: '100g fillet',
				},
				{
					name: 'Pumpkin',
					category: 'Vegetables',
					calories: 26,
					carbohydrates: 6.5,
					protein: 1,
					fats: 0.1,
					fiber: 0.5,
					sodium: 1,
					sugar: 2.8,
					calcium: 21,
					iron: 0.8,
					moisture: 92,
					image: 'https://www.icegif.com/wp-content/uploads/2023/10/icegif-72.gif',
					servingSize: '½ cup mashed (120g)',
				},
				{
					name: 'Blueberries',
					category: 'Fruits',
					calories: 57,
					carbohydrates: 14.5,
					protein: 0.7,
					fats: 0.3,
					fiber: 2.4,
					sodium: 1,
					sugar: 9.7,
					calcium: 6,
					iron: 0.3,
					moisture: 84,
					image: 'https://i.pinimg.com/originals/1e/09/e7/1e09e7533262f2a6bf5badfe05c71c3e.gif',
					servingSize: '½ cup (74g)',
				},
				{
					name: 'Oatmeal',
					category: 'Grains',
					calories: 150,
					carbohydrates: 27,
					protein: 5,
					fats: 3,
					fiber: 4,
					sodium: 2,
					sugar: 0.7,
					calcium: 21,
					iron: 1.7,
					moisture: 10,
					image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTh3MW41b3BmdzRiMm80NjVnY2VtaDZob3hmeW42dmF0cTN5NXk3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif',
					servingSize: '½ cup dry (40g)',
				},
				{
					name: 'Chicken Liver',
					category: 'Organ Meats',
					calories: 135,
					carbohydrates: 0.9,
					protein: 25,
					fats: 3.9,
					fiber: 0,
					sodium: 71,
					sugar: 0,
					calcium: 11,
					iron: 9.2,
					moisture: 68,
					image: 'https://media.baamboozle.com/uploads/images/1148231/1680373007_183059_gif-url.gif',
					servingSize: '40g',
				},
				{
					name: 'Carrots',
					category: 'Vegetables',
					calories: 41,
					carbohydrates: 9.6,
					protein: 0.9,
					fats: 0.2,
					fiber: 2.8,
					sodium: 69,
					sugar: 4.7,
					calcium: 33,
					iron: 0.3,
					moisture: 88,
					image: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGt6bTVlZnV6cmVtMjl4aGo4ZmZuMTl6cGsxY2xmc2djank4NG1lNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Pmj5hfzsgEZzJScmJQ/giphy.gif',
					servingSize: '1 medium (61g)',
				},
				{
					name: 'Greek Yogurt',
					category: 'Dairy & Eggs',
					calories: 100,
					carbohydrates: 4,
					protein: 10,
					fats: 5,
					fiber: 0,
					sodium: 36,
					sugar: 3.5,
					calcium: 110,
					iron: 0,
					moisture: 85,
					image: 'https://cdn.dribbble.com/userupload/21321693/file/original-8317b5963818a5710713c017c586df74.gif',
					servingSize: '½ cup (113g)',
				},
				{
					name: 'Coconut Oil',
					category: 'Oils & Vinegars',
					calories: 117,
					carbohydrates: 0,
					protein: 0,
					fats: 14,
					fiber: 0,
					sodium: 0,
					sugar: 0,
					calcium: 0,
					iron: 0,
					moisture: 0,
					image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaThycnUyMmR3ZXplODk0OG00M2Q2d2gxcW1rYTFvYThtMmZ0ZjRqeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/U9Q3jbpsDcSz9BMQnS/giphy.gif',
					servingSize: '1 tbsp (14g)',
				},
				{
					name: 'Vegetable Broth',
					category: 'Broths & Stocks',
					calories: 12,
					carbohydrates: 2.3,
					protein: 0.5,
					fats: 0.1,
					fiber: 0.2,
					sodium: 350,
					sugar: 1.1,
					calcium: 15,
					iron: 0.3,
					moisture: 96,
					image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHJlbmZwdjdmMGhwbTlya3d6M290MjZvdHpyYzBhMG9lY3A1YTFqZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUOrvYDUuRXnlhoVlm/giphy.gif',
					servingSize: '1 cup (240ml)',
				},
				{
					name: 'Almonds',
					category: 'Nuts & Seeds',
					calories: 164,
					carbohydrates: 6.1,
					protein: 6,
					fats: 14,
					fiber: 3.5,
					sodium: 0,
					sugar: 1.2,
					calcium: 76,
					iron: 1,
					moisture: 4,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 oz (28g)',
				},
				{
					name: 'Black Beans',
					category: 'Legumes',
					calories: 114,
					carbohydrates: 20.4,
					protein: 7.6,
					fats: 0.5,
					fiber: 7.5,
					sodium: 1,
					sugar: 0.3,
					calcium: 23,
					iron: 2.1,
					moisture: 59,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '½ cup cooked (86g)',
				},
				{
					name: 'Chia Seeds',
					category: 'Nuts & Seeds',
					calories: 137,
					carbohydrates: 12,
					protein: 4,
					fats: 9,
					fiber: 10,
					sodium: 5,
					sugar: 0,
					calcium: 177,
					iron: 2.2,
					moisture: 5,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 oz (28g)',
				},
				{
					name: 'Tomato Sauce',
					category: 'Condiments',
					calories: 29,
					carbohydrates: 6.2,
					protein: 1.4,
					fats: 0.2,
					fiber: 1.4,
					sodium: 297,
					sugar: 4.2,
					calcium: 12,
					iron: 0.8,
					moisture: 87,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '½ cup (120g)',
				},
				{
					name: 'Whole Wheat Pasta',
					category: 'Grains',
					calories: 174,
					carbohydrates: 37,
					protein: 7,
					fats: 0.8,
					fiber: 6,
					sodium: 4,
					sugar: 1,
					calcium: 15,
					iron: 1.3,
					moisture: 10,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 cup cooked (140g)',
				},
				{
					name: 'Mozzarella Cheese',
					category: 'Dairy & Eggs',
					calories: 280,
					carbohydrates: 2,
					protein: 28,
					fats: 17,
					fiber: 0,
					sodium: 543,
					sugar: 1,
					calcium: 731,
					iron: 0.2,
					moisture: 49,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 cup shredded (113g)',
				},
				{
					name: 'Cashews',
					category: 'Nuts & Seeds',
					calories: 157,
					carbohydrates: 9.2,
					protein: 5.2,
					fats: 12.4,
					fiber: 0.9,
					sodium: 3,
					sugar: 1.7,
					calcium: 10,
					iron: 1.9,
					moisture: 3,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 oz (28g)',
				},
				{
					name: 'Green Peas',
					category: 'Vegetables',
					calories: 62,
					carbohydrates: 11,
					protein: 4,
					fats: 0.2,
					fiber: 4.4,
					sodium: 2,
					sugar: 3.6,
					calcium: 25,
					iron: 1.5,
					moisture: 78,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '½ cup cooked (80g)',
				},
				{
					name: 'Walnuts',
					category: 'Nuts & Seeds',
					calories: 185,
					carbohydrates: 4,
					protein: 4.3,
					fats: 18,
					fiber: 1.9,
					sodium: 0,
					sugar: 0.7,
					calcium: 27,
					iron: 0.8,
					moisture: 3,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 oz (28g)',
				},
				{
					name: 'Ground Beef',
					category: 'Meats',
					calories: 250,
					carbohydrates: 0,
					protein: 26,
					fats: 17,
					fiber: 0,
					sodium: 73,
					sugar: 0,
					calcium: 11,
					iron: 2.7,
					moisture: 55,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Pork Chop',
					category: 'Meats',
					calories: 231,
					carbohydrates: 0,
					protein: 25,
					fats: 14,
					fiber: 0,
					sodium: 50,
					sugar: 0,
					calcium: 15,
					iron: 1,
					moisture: 58,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Turkey Breast',
					category: 'Meats',
					calories: 135,
					carbohydrates: 0,
					protein: 29,
					fats: 1,
					fiber: 0,
					sodium: 48,
					sugar: 0,
					calcium: 13,
					iron: 0.8,
					moisture: 65,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Onion',
					category: 'Vegetables',
					calories: 40,
					carbohydrates: 9,
					protein: 1.1,
					fats: 0.1,
					fiber: 1.7,
					sodium: 4,
					sugar: 4.2,
					calcium: 23,
					iron: 0.2,
					moisture: 88,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 medium (110g)',
				},
				{
					name: 'Garlic',
					category: 'Vegetables',
					calories: 149,
					carbohydrates: 33,
					protein: 6.4,
					fats: 0.5,
					fiber: 2.1,
					sodium: 17,
					sugar: 1,
					calcium: 181,
					iron: 1.7,
					moisture: 58,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 clove (3g)',
				},
				{
					name: 'Bell Pepper',
					category: 'Vegetables',
					calories: 31,
					carbohydrates: 7,
					protein: 1,
					fats: 0.3,
					fiber: 2,
					sodium: 4,
					sugar: 5,
					calcium: 10,
					iron: 0.4,
					moisture: 91,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 medium (119g)',
				},
				{
					name: 'Apple',
					category: 'Fruits',
					calories: 95,
					carbohydrates: 25,
					protein: 0.5,
					fats: 0.3,
					fiber: 4.4,
					sodium: 2,
					sugar: 19,
					calcium: 11,
					iron: 0.2,
					moisture: 85,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 medium (182g)',
				},
				{
					name: 'Banana',
					category: 'Fruits',
					calories: 105,
					carbohydrates: 27,
					protein: 1.3,
					fats: 0.3,
					fiber: 3.1,
					sodium: 1,
					sugar: 14,
					calcium: 6,
					iron: 0.3,
					moisture: 74,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 medium (118g)',
				},
				{
					name: 'Strawberry',
					category: 'Fruits',
					calories: 32,
					carbohydrates: 7.7,
					protein: 0.7,
					fats: 0.3,
					fiber: 2,
					sodium: 1,
					sugar: 4.9,
					calcium: 16,
					iron: 0.4,
					moisture: 91,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 cup (152g)',
				},
				{
					name: 'Milk',
					category: 'Dairy & Eggs',
					calories: 103,
					carbohydrates: 12,
					protein: 8,
					fats: 2.4,
					fiber: 0,
					sodium: 98,
					sugar: 12,
					calcium: 305,
					iron: 0,
					moisture: 89,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 cup (244g)',
				},
				{
					name: 'Butter',
					category: 'Dairy & Eggs',
					calories: 102,
					carbohydrates: 0,
					protein: 0.1,
					fats: 11.5,
					fiber: 0,
					sodium: 82,
					sugar: 0,
					calcium: 3,
					iron: 0,
					moisture: 16,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 tbsp (14g)',
				},
				{
					name: 'Eggs',
					category: 'Dairy & Eggs',
					calories: 68,
					carbohydrates: 0.6,
					protein: 5.5,
					fats: 4.8,
					fiber: 0,
					sodium: 62,
					sugar: 0.6,
					calcium: 25,
					iron: 0.8,
					moisture: 88,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 large egg (50g)',
				},
				{
					name: 'Beef Liver',
					category: 'Organ Meats',
					calories: 135,
					carbohydrates: 1.3,
					protein: 20.4,
					fats: 3.9,
					fiber: 0,
					sodium: 69,
					sugar: 0,
					calcium: 9,
					iron: 6.5,
					moisture: 71,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '40g',
				},
				{
					name: 'Duck Neck',
					category: 'Meats',
					calories: 255,
					carbohydrates: 0,
					protein: 21,
					fats: 20,
					fiber: 0,
					sodium: 55,
					sugar: 0,
					calcium: 75,
					iron: 1.8,
					moisture: 58,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Green Tripe',
					category: 'Organ Meats',
					calories: 125,
					carbohydrates: 0,
					protein: 18,
					fats: 4.5,
					fiber: 0,
					sodium: 40,
					sugar: 0,
					calcium: 70,
					iron: 1.9,
					moisture: 76,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Quail Egg',
					category: 'Dairy & Eggs',
					calories: 14,
					carbohydrates: 0.2,
					protein: 1.2,
					fats: 1,
					fiber: 0,
					sodium: 14,
					sugar: 0,
					calcium: 10,
					iron: 0.5,
					moisture: 75,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 egg (9g)',
				},
				{
					name: 'Salmon Skin',
					category: 'Seafood',
					calories: 150,
					carbohydrates: 0,
					protein: 22,
					fats: 8,
					fiber: 0,
					sodium: 50,
					sugar: 0,
					calcium: 12,
					iron: 0.7,
					moisture: 60,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '50g',
				},
				{
					name: 'Turkey Thigh',
					category: 'Meats',
					calories: 179,
					carbohydrates: 0,
					protein: 24,
					fats: 8,
					fiber: 0,
					sodium: 58,
					sugar: 0,
					calcium: 13,
					iron: 1.1,
					moisture: 65,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Chicken Gizzards',
					category: 'Organ Meats',
					calories: 94,
					carbohydrates: 0.7,
					protein: 17.7,
					fats: 2.1,
					fiber: 0,
					sodium: 62,
					sugar: 0,
					calcium: 9,
					iron: 2.2,
					moisture: 72,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Cottage Cheese',
					category: 'Dairy & Eggs',
					calories: 98,
					carbohydrates: 3.4,
					protein: 11.1,
					fats: 4.3,
					fiber: 0,
					sodium: 373,
					sugar: 2.7,
					calcium: 83,
					iron: 0.1,
					moisture: 80,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '½ cup (113g)',
				},
				{
					name: 'Butternut Squash',
					category: 'Vegetables',
					calories: 82,
					carbohydrates: 21.5,
					protein: 1.8,
					fats: 0.2,
					fiber: 6.6,
					sodium: 8,
					sugar: 4.8,
					calcium: 47,
					iron: 0.7,
					moisture: 89,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '½ cup mashed (122g)',
				},
				{
					name: 'Zucchini',
					category: 'Vegetables',
					calories: 17,
					carbohydrates: 3.1,
					protein: 1.2,
					fats: 0.3,
					fiber: 1,
					sodium: 8,
					sugar: 2.1,
					calcium: 16,
					iron: 0.4,
					moisture: 95,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 medium (196g)',
				},
				{
					name: 'Duck Breast',
					category: 'Meats',
					calories: 135,
					carbohydrates: 0,
					protein: 23,
					fats: 4.5,
					fiber: 0,
					sodium: 50,
					sugar: 0,
					calcium: 10,
					iron: 1.3,
					moisture: 67,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Kale',
					category: 'Vegetables',
					calories: 50,
					carbohydrates: 8.8,
					protein: 3.3,
					fats: 0.7,
					fiber: 2.7,
					sodium: 25,
					sugar: 1.3,
					calcium: 150,
					iron: 1.6,
					moisture: 84,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 cup chopped (67g)',
				},
				{
					name: 'Coconut Flour',
					category: 'Baking',
					calories: 120,
					carbohydrates: 16,
					protein: 5,
					fats: 4,
					fiber: 10,
					sodium: 15,
					sugar: 2,
					calcium: 17,
					iron: 1.8,
					moisture: 9,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '¼ cup (28g)',
				},
				{
					name: 'Pumpkin Seeds',
					category: 'Nuts & Seeds',
					calories: 126,
					carbohydrates: 15,
					protein: 7,
					fats: 5.6,
					fiber: 1.7,
					sodium: 3,
					sugar: 1.1,
					calcium: 6,
					iron: 0.9,
					moisture: 6,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 oz (28g)',
				},
				{
					name: 'Chicken Feet',
					category: 'Meats',
					calories: 190,
					carbohydrates: 0,
					protein: 19,
					fats: 14,
					fiber: 0,
					sodium: 62,
					sugar: 0,
					calcium: 88,
					iron: 0.9,
					moisture: 64,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '1 piece (35g)',
				},
				{
					name: 'Whole Rabbit',
					category: 'Meats',
					calories: 173,
					carbohydrates: 0,
					protein: 30,
					fats: 6,
					fiber: 0,
					sodium: 47,
					sugar: 0,
					calcium: 18,
					iron: 3.2,
					moisture: 67,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Ground Chicken',
					category: 'Meats',
					calories: 143,
					carbohydrates: 0,
					protein: 18,
					fats: 7.4,
					fiber: 0,
					sodium: 67,
					sugar: 0,
					calcium: 11,
					iron: 0.9,
					moisture: 69,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
				{
					name: 'Ground Pork',
					category: 'Meats',
					calories: 263,
					carbohydrates: 0,
					protein: 25,
					fats: 18,
					fiber: 0,
					sodium: 54,
					sugar: 0,
					calcium: 9,
					iron: 1.2,
					moisture: 62,
					image: 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif',
					servingSize: '100g',
				},
			],
			{ validate: true }
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete(options, null, {});
	},
};
