'use strict';

let options = {};
options.tableName = 'SousChefs'
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			options.tableName,
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					unique: true,
					references: {
						model: 'Users',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				name: {
					type: Sequelize.STRING(50),
					allowNull: false,
					defaultValue: 'SousChef',
				},
				level: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 1,
					validate: {
						min: 0,
					},
				},
				xp: {
					type: Sequelize.INTEGER,
					allowNull: false,
					defaultValue: 0,
					validate: {
						min: 0,
					},
				},
				type: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: 'Basic',
				},
				evoStage: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: 'Apprentice Chef',
				},
				imageUrl: {
					type: Sequelize.STRING,
					allowNull: true,
					defaultValue:
						'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef.png',
				},
				animationUrl: {
					type: Sequelize.STRING,
					allowNull: true,
					defaultValue:
						'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef-animation.json',
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			},
			options
		);
	},

  async down(queryInterface, Sequelize) {
    // options.tableName = 'SousChefs';
		await queryInterface.dropTable(options.tableName, options);
	},
};
