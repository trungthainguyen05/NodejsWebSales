import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleGetAllUser = (inputLimit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputLimit) {
                inputLimit = 10;
            }
            let { count, rows } = await db.User.findAndCountAll({
                offset: 0, //position we start to get the data
                limit: + inputLimit, //how many record we want to get
                raw: true
            });

            let userList = rows;
            if (userList && userList.length > 0) {
                for (let i = 0; i < userList.length; i++) {
                    // userList[i] = rows[i];
                    delete userList[i].password;
                }
            }

            resolve({
                errCode: 0,
                errMessage: 'OK',
                userList: userList,
                count: count
            })

        } catch (e) {
            reject(e)
        }
    })
}

let handleGetAllUserByPaging = (inputOffset, inputLimit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputOffset || !inputLimit) {
                inputOffset = 0;
                inputLimit = 10;
            }

            let { count, rows } = await db.User.findAndCountAll({
                offset: + inputOffset, //position we start to get the data
                limit: + inputLimit, //how many record we want to get
                raw: true
            });

            let userList = {};

            if (rows && rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    let temp = {};
                    delete rows[i].password;

                    // temp.id = rows[i].id;
                    // temp.email = rows[i].email;
                    // temp.firstName = rows[i].firstName;
                    // temp.lastName = rows[i].lastName;
                    // temp.address = rows[i].address;
                    // temp.phonenumber = rows[i].phonenumber;
                    // temp.gender = rows[i].gender;
                    // temp.roleId = rows[i].roleId;
                    // temp.image = rows[i].image;
                    // temp.createdAt = rows[i].createdAt;
                    // temp.updatedAt = rows[i].updatedAt;
                }
            }

            // userList.push(rows);

            resolve({
                errCode: 0,
                errMessage: 'OK',
                userList: rows,
                count: count
            })

        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteUserService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input id',
                })
            }

            let user = await db.User.findOne({
                where: { id: inputId },
            })

            if (user) {
                await db.User.destroy({
                    where: { id: inputId }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Delete the user is successful',
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'The id is not correct',
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let handleGetAllcodesService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                let allCode = await db.AllCode.findAll()
                resolve({
                    errCode: 0,
                    errMessage: 'Getting all data from Allcode',
                    data: allCode
                })
            } else {
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput }
                })
                if (!allCode) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Your typeInput is not correct'
                    })
                } else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Okay',
                        data: allCode
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleGetAllUser: handleGetAllUser,
    handleGetAllUserByPaging: handleGetAllUserByPaging,
    handleDeleteUserService: handleDeleteUserService,
    handleGetAllcodesService: handleGetAllcodesService,
}