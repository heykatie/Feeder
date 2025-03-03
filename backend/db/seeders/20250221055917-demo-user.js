'use strict';

const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await User.bulkCreate(
			[
				{
					firstName: 'Cutie',
					lastName: 'Patootie',
					phone: '+11234567890',
					birthday: '1990-01-01',
					email: 'qt@tootie.io',
					username: 'cutie-patutu',
					hashedPassword: await bcrypt.hash('Password123@', 10),
					bio: 'This is a demo user bio.',
					theme: 'dark',
				},
				{
					firstName: 'Lovely',
					lastName: 'Hooman',
					phone: '+14155552671',
					birthday: '1988-05-15',
					email: 'lovely@hooman.io',
					username: 'lovelyhooman',
					hashedPassword: await bcrypt.hash('Password123@', 10),
					bio: 'I love cooking for my pet!',
					theme: 'light',
				},
				{
					firstName: 'Tater',
					lastName: 'Tots',
					phone: '+442071838750',
					birthday: '1995-07-20',
					email: 'tater@tots.io',
					username: 'tatertots',
					hashedPassword: await bcrypt.hash('Password123@', 10),
					bio: 'Excited to level up my SousChef!',
					theme: 'system',
				},
			],
			{ validate: true, individualHooks: true }
		);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
			},
			{}
		);
	},
};
