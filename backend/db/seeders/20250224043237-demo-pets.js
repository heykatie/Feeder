'use strict';

const { Sequelize, Pet } = require('../models');

let options = {};
options.tableName = 'Pets';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await Pet.bulkCreate(
			[
				{
					userId: 1,
					name: 'Whiskers',
					species: 'cat',
					breed: 'Siamese',
					age: 3,
					weight: 10.5,
					allergies: 'None',
					notes: 'Loves fish-based meals.',
					image: 'https://nftcalendar.io/storage/uploads/news/2022/1/jSvtcuMnmSCqFUMb8wvq8MbKtyq4crPL4kVGZ4EZ.gif',
					birthday: '2021-02-14',
				},
				{
					userId: 2,
					name: 'Rex',
					species: 'dog',
					breed: 'Golden Retriever',
					age: 5,
					weight: 65.2,
					allergies: 'Peanuts',
					notes: 'Very active and loves to play fetch.',
					image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZnZHUwcmV6MW90bDh0N2xibnh5bGs1dG05bmtrMTJ2emE5Y284YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o0EoFrYBqjtyV7Qpgq/giphy.gif',
					birthday: '2019-08-25',
				},
				{
					userId: 3,
					name: 'Mittens',
					species: 'cat',
					breed: 'Persian',
					age: 4,
					weight: 12.3,
					allergies: 'Dairy',
					notes: 'Prefers warm meals and cozy naps.',
					image: 'https://nftcalendar.io/storage/uploads/news/2022/1/jSvtcuMnmSCqFUMb8wvq8MbKtyq4crPL4kVGZ4EZ.gif',
					birthday: '2020-06-30',
				},
			],
			{ validate: true, individualHooks: true }
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete(options, null, {});
	},
};