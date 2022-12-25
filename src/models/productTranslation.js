'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductTranslation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductTranslation.init({
        languageId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        detail: DataTypes.STRING,
        seoAlias: DataTypes.STRING,
        seoTiles: DataTypes.STRING,
        seoDescription: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ProductTranslation',
    });
    return ProductTranslation;
};