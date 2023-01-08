'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Users', [{
            email: 'trungthainguyen05@gmail.com',
            password: '123456',
            firstName: 'Trung',
            lastName: 'Nguyen',
            address: 'Nhơn Trạch, Đồng Nai',
            phonenumber: '0931496232',
            gender: 'M',
            roleId: 'R1',

            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
