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
					firstName: 'Demo',
					lastName: 'User',
					phone: '+11234567890',
					birthday: '1990-01-01',
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: await bcrypt.hash('Password123@', 10),
					bio: 'This is a demo user bio.',
					theme: 'dark',
				},
				{
					firstName: 'Fake',
					lastName: 'User',
					phone: '+14155552671',
					birthday: '1988-05-15',
					email: 'user1@user.io',
					username: 'FakeUser1',
					hashedPassword: await bcrypt.hash('Password123@', 10),
					bio: 'I love cooking for my pet!',
					theme: 'light',
				},
				{
					firstName: 'Fakeh',
					lastName: 'User',
					phone: '+442071838750',
					birthday: '1995-07-20',
					email: 'user2@user.io',
					username: 'FakeUser2',
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
