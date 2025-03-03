'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const SousChef = sequelize.define(
		'SousChef',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				defaultValue: 'SousChef',
			},
			level: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
				validate: {
					min: 1,
				},
			},
			xp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				validate: {
					min: 0,
				},
			},
			type: {
				type: DataTypes.ENUM(
					'Starter Spoon', // (Basic) - The newbie chef just getting started
					'Whisk Tamer', // (Baker) - Master of dough and desserts
					'Chill Conjurer', // (Freeze Expert) - Ice-cold precision in frozen treats
					'Broth Whisperer', // (Broth Healer) - Brews magical healing broths
					'Flame Forged', // (Grill Master) - Blazing hot BBQ expert
					'Alchemist', // (Alchemist) - A scientist in the kitchen, mixing elements
					'Herb Sage', // (Herbalist) - Master of plants and natural healing
					'Prime Cut Pro', // (Butcher) - Precision slicer, master of meats
					'RawDawg', // (Raw Feeder) - No cooking, just pure, primal meals
					'Gilded Gourmet', // (Fancy Feaster) - Luxurious, 5-star pet cuisine
					'Zen Healer', // (Holistic Angel) - Balanced meals for the soul
					'Soothing Angel', // (Therapeutic) - Cooks with health and healing in mind
					'Arcane Chef', // (Mystic) - Uses ancient knowledge for powerful meals
					'Wandering Nomad', // (Nomadic) - Inspired by global pet cuisines
					'Cybernetic Saucier', // (Cyber) - Tech-powered precision cooking
					'Untamed Flavorist', // (Wild) - Rustic, primal, and instinct-driven chef
					'Dehydrated Hydra' // (Dehydration Specialist) - Master of preserving meals
				),
				allowNull: false,
				defaultValue: 'Starter Spoon',
			},
			evoStage: {
				type: DataTypes.ENUM(
					'Foraging Fledgling',
					'Culinary Explorer',
					'Epicurean Beastmaster'
				),
				allowNull: false,
				defaultValue: 'Foraging Fledgling',
			},
			color: {
				type: DataTypes.STRING(7),
				allowNull: false,
				defaultValue: '#FFCC00',
			},
			personality: {
				type: DataTypes.ENUM('Playful', 'Serious', 'Mischievous', 'Calm'),
				allowNull: false,
				defaultValue: 'Playful',
			},
			eyeShape: {
				type: DataTypes.ENUM('cute', 'serious', 'glowing'),
				allowNull: false,
				defaultValue: 'cute',
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue:
					'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef.png',
			},
			animationUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue:
					'https://souschef-prj.s3.us-west-1.amazonaws.com/default-souschef-animation.json',
			},
		},
		{
			sequelize,
			modelName: 'SousChef',
			defaultScope: {
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
				},
			},
		}
	);

	SousChef.associate = function (models) {
		SousChef.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};

	return SousChef;
};
