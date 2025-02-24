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
					image: 'https://example.com/whiskers.jpg',
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
					image: 'https://example.com/rex.jpg',
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
					image: 'https://example.com/mittens.jpg',
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