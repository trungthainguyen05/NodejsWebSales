'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryTranslation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CategoryTranslation.init({
        categoryId: DataTypes.INTEGER,
        languageId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        seoAlias: DataTypes.STRING,
        seoDescription: DataTypes.STRING,
        seoTitle: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'CategoryTranslation',
    });
    return CategoryTranslation;
};