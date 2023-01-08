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

            // let userList = {};
            if (rows && rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    // userList[i] = rows[i];
                    delete rows[i].password;
                }
            }

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

module.exports = {
    handleGetAllUser: handleGetAllUser,
    handleGetAllUserByPaging: handleGetAllUserByPaging,
    handleDeleteUserService: handleDeleteUserService,
}