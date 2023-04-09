'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class apiList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    apiList.init({
        urlApi: DataTypes.STRING,
        method: DataTypes.STRING,
        description: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'apiList',
    });
    return apiList;
};