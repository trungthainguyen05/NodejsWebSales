'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init({
        orderDetailId: DataTypes.INTEGER,
        orderDate: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        shipName: DataTypes.STRING,
        shipAddress: DataTypes.STRING,
        shipEmail: DataTypes.STRING,
        shipPhonenumber: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};