'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CategoryTranslations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // categoryId: DataTypes.INTEGER,
            // languageId: DataTypes.INTEGER,
            // name: DataTypes.STRING,
            // seoAlias: DataTypes.STRING,
            // seoDescription: DataTypes.STRING,
            // seoTitle: DataTypes.STRING,

            categoryId: {
                type: Sequelize.STRING
            },
            languageId: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            seoAlias: {
                type: Sequelize.STRING
            },
            seoDescription: {
                type: Sequelize.STRING
            },
            seoTitle: {
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
        await queryInterface.dropTable('CategoryTranslations');
    }
};