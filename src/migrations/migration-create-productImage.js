'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductImages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // productId: DataTypes.INTEGER,
            // imgFront: DataTypes.STRING,
            // imgBehind: DataTypes.STRING,
            // imgLeft: DataTypes.STRING,
            // imgRight: DataTypes.STRING,
            // video: DataTypes.STRING,
            // status: DataTypes.STRING,

            productId: {
                type: Sequelize.INTEGER
            },
            imgFront: {
                type: Sequelize.STRING
            },
            imgBehind: {
                type: Sequelize.STRING
            },
            imgLeft: {
                type: Sequelize.STRING
            },
            imgRight: {
                type: Sequelize.STRING
            },
            video: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductImages');
    }
};