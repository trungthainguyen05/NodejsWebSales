'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            //     sellPrice: DataTypes.INTEGER,
            // originalPrice: DataTypes.INTEGER,
            // stock: DataTypes.INTEGER,
            // viewCount: DataTypes.INTEGER,
            // productTranslationId: DataTypes.INTEGER,
            // productInCategoryId: DataTypes.INTEGER,
            // productImageId: DataTypes.INTEGER,
            // productVideoId: DataTypes.INTEGER,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sellPrice: {
                type: Sequelize.INTEGER
            },
            originalPrice: {
                type: Sequelize.INTEGER
            },
            stock: {
                type: Sequelize.INTEGER
            },
            viewCount: {
                type: Sequelize.INTEGER
            },
            productTranslationId: {
                type: Sequelize.INTEGER
            },
            productInCategoryId: {
                type: Sequelize.INTEGER
            },
            productImageId: {
                type: Sequelize.INTEGER
            },
            productVideoId: {
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
        await queryInterface.dropTable('Products');
    }
};