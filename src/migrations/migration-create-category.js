'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            //   productId: DataTypes.INTEGER,
            //     categoryTranslation: DataTypes.INTEGER,
            //     sortOrder: DataTypes.STRING,
            //     isShowOnHome: DataTypes.STRING,
            //     status: DataTypes.STRING,

            productId: {
                type: Sequelize.INTEGER
            },
            categoryTranslation: {
                type: Sequelize.INTEGER
            },
            sortOrder: {
                type: Sequelize.STRING
            },
            isShowOnHome: {
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
        await queryInterface.dropTable('Categories');
    }
};