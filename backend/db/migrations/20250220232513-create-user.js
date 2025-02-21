'use strict';

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
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
				firstName: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				lastName: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				phone: {
					type: Sequelize.STRING(18),
					allowNull: true,
				},
				birthday: {
					type: Sequelize.DATEONLY,
					allowNull: true,
				},
				username: {
					type: Sequelize.STRING(30),
					allowNull: false,
					unique: true,
				},
				email: {
					type: Sequelize.STRING(256),
					allowNull: false,
					unique: true,
				},
				hashedPassword: {
					type: Sequelize.STRING.BINARY,
					allowNull: false,
				},
				avatarUrl: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue:
						'https://souschef-prj.s3.us-west-1.amazonaws.com/default-avatar.png',
				},
				bio: {
					type: Sequelize.TEXT,
					allowNull: false,
					defaultValue: '',
				},
				theme: {
					type: Sequelize.STRING,
					allowNull: false,
					defaultValue: 'dark',
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
    // options.tableName = 'Users';
    await queryInterface.dropTable(options.tableName, options);
  }
};