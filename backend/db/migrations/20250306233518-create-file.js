'use strict';

let options = {};
options.tableName = 'Files';
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'Files',
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
					references: { model: 'Users' },
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				fileUrl: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				fileType: {
					type: Sequelize.STRING,
					allowNull: true,
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
					type: Sequelize.INTEGER,
					allowNull: true,
					validate: {
						min: 0,
						max: 10 * 1024 * 1024, // 10MB limit
					},
				},
				fileName: {
					type: Sequelize.STRING,
					allowNull: true,
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
		options.tableName = 'Files';
		if (process.env.NODE_ENV === 'production') {
			options.schema = process.env.SCHEMA;
		}
		await queryInterface.dropTable(options);
	},
};
