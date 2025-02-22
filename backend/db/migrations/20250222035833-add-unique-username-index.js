'use strict';

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addIndex(
			options,
			[Sequelize.fn('LOWER', Sequelize.col('username'))],
			{
				unique: true,
				name: 'unique_username_lowercase_index',
			}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeIndex(
			options,
			'unique_username_lowercase_index'
		);
	},
};
