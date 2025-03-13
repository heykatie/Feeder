'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class File extends Model {
		static associate(models) {
			File.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE', // Ensures proper relationship updates
			});
		}
	}

	File.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'userId',
			},
			fileUrl: {
				type: DataTypes.TEXT,
				allowNull: false,
				field: 'fileUrl',
				validate: {
					isUrl: true, // Ensure URLs are valid
				},
			},
			fileType: {
				type: DataTypes.STRING,
				allowNull: true,
				field: 'fileType',
				validate: {
					isIn: [
						[
							'image/jpeg',
							'image/png',
							'application/pdf',
							'video/mp4',
							'application/vnd.ms-excel',
						],
					],
				},
			},
			fileSize: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: 'fileSize',
				validate: {
					min: 0,
					max: 10 * 1024 * 1024, // 10MB limit
				},
			},
			fileName: {
				type: DataTypes.STRING,
				allowNull: true,
				field: 'fileName',
				validate: {
					len: [0, 255],
				},
			},
		},
		{
			sequelize,
			modelName: 'File',
			tableName: 'Files',
			timestamps: true,
		}
	);

	return File;
};
