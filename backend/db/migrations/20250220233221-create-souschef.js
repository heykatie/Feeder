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
			options,
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
						min: 1,
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
					type: Sequelize.ENUM(
						'Starter Spoon',
						'Whisk Tamer',
						'Chill Conjurer',
						'Broth Whisperer',
						'Flame Forged',
						'Alchemist',
						'Herb Sage',
						'Prime Cut Pro',
						'RawDawg',
						'Gilded Gourmet',
						'Zen Healer',
						'Soothing Angel',
						'Arcane Chef',
						'Wandering Nomad',
						'Cybernetic Saucier',
						'Untamed Flavorist',
						'Dehydrated Hydra'
					),
					allowNull: false,
					defaultValue: 'Starter Spoon',
				},
				evoStage: {
					type: Sequelize.ENUM(
						'Foraging Fledgling',
						'Culinary Explorer',
						'Epicurean Beastmaster'
					),
					allowNull: false,
					defaultValue: 'Foraging Fledgling',
				},
				color: {
					type: Sequelize.STRING(7),
					allowNull: false,
					defaultValue: '#FFCC00',
				},
				personality: {
					type: Sequelize.ENUM(
						'Playful',
						'Serious',
						'Mischievous',
						'Calm'
					),
					allowNull: false,
					defaultValue: 'Playful',
				},
				eyeShape: {
					type: Sequelize.ENUM('cute', 'serious', 'glowing'),
					allowNull: false,
					defaultValue: 'cute',
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
