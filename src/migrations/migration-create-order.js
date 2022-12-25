'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // orderDetailId: DataTypes.INTEGER,
            // orderDate: DataTypes.STRING,
            // userId: DataTypes.INTEGER,
            // shipName: DataTypes.STRING,
            // shipAddress: DataTypes.STRING,
            // shipEmail: DataTypes.STRING,
            // shipPhonenumber: DataTypes.STRING,
            // status: DataTypes.STRING

            orderDetailId: {
                type: Sequelize.INTEGER
            },
            orderDate: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER
            },
            shipName: {
                type: Sequelize.STRING
            },
            shipAddress: {
                type: Sequelize.STRING
            },
            shipEmail: {
                type: Sequelize.STRING
            },
            shipPhonenumber: {
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
        await queryInterface.dropTable('Orders');
    }
};