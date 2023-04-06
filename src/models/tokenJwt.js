'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tokenJwt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    tokenJwt.init({
        idUser: DataTypes.STRING,
        accessToken: DataTypes.TEXT,
        refreshToken: DataTypes.TEXT,


    }, {
        sequelize,
        modelName: 'tokenJwt',
    });
    return tokenJwt;
};