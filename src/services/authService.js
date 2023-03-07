import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const salt = bcrypt.genSaltSync(10);
//REDIS: lưu token into database
let refreshTokensDB = [];

//Generate access token
let generateAccessToken = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accessToken = await jwt.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
            },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "30d" }
            )
            resolve(accessToken);
        } catch (e) {
            reject(e);
        }
    })
}

//Generate Refresh Token
let generateRefreshToken = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let refreshToken = await jwt.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
            },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: "30d" }
            )
            resolve(refreshToken);
        } catch (e) {
            reject(e);
        }
    })
}

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


let handleLoginService = (inputEmail, inputPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Validate inputdata
            if (!inputEmail || !inputPassword) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing require parameters'
                })
            }

            let userData = {};
            let isExist = await checkUserEmail(inputEmail);
            if (isExist) {
                userData = await db.User.findOne({
                    where: { email: inputEmail },
                    attributes: ['id', 'email', 'firstName', 'password',
                        'lastName', 'address', 'phonenumber',
                        'gender', 'roleId'],
                    raw: true
                })

                //Compared password
                let comparedPasswordResult = await bcrypt.compareSync(inputPassword, userData.password);
                if (comparedPasswordResult) {

                    delete userData.password;
                    let accessToken = await generateAccessToken(userData);
                    let refreshToken = await generateRefreshToken(userData);

                    // await insertRefreshTokenInDb(refreshToken);

                    resolve({
                        errCode: 0,
                        errMessage: 'The login is succesful',
                        user: userData,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    })
                }

            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'The email or password is not correct.'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let insertRefreshTokenInDb = async (refresh_Token) => {
    try {
        let createRefreshToken = await db.refreshToken.create({
            token: refresh_Token,
        });
        return await createRefreshToken.save();
    } catch (e) {
        console.log(e);
    }
}

let checkUserEmail = (inputEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: inputEmail
                }
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e)
        }
    })
}

/* Create user
step 0: validate data
step 1: check exist email
Step 2: convert pass into hashPass
Step 3:
*/

let handleCreateNewUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //validate
            let validateField = ['email', 'password', 'firstName', 'lastName',
                'address', 'phonenumber', 'gender', 'roleId'];
            let resultValidate = validateCreateNewUserData(validateField, data);
            if (resultValidate.isValid) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameters: ${resultValidate.fieldNotQualify}`
                })
            }

            //check email in database
            let isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 2,
                    errMessage: 'The register email is exsiting in the database'
                })
            }
            //Create user
            else {
                //hash password
                let hashPassword = await hashUserPassword(data.password);

                let createUser = await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                });
                await createUser.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Create the user is successful.'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let validateCreateNewUserData = (arrField, data) => {
    let isValid = false;
    let fieldNotQualify = '';

    for (let i = 0; i < arrField.length; i++) {
        if (!data[arrField[i]]) {
            isValid = true;
            fieldNotQualify = arrField[i];
            break;
        }
    }

    return {
        isValid: isValid,
        fieldNotQualify: fieldNotQualify,
    }
}

let isCheckExistRefreshToken = async (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isCheckExist = false;
            if (!refreshToken) {
                return isCheckExist;
            }

            let checkToken = await db.refreshToken.findOne({
                where: {
                    token: refreshToken
                }
            })

            // console.log('>> Check compare refreshtoken: ', checkToken)

            if (!checkToken) {
                resolve({
                    isCheckExist: isCheckExist
                })
            } else {
                isCheckExist = true;
                resolve({
                    isCheckExist: isCheckExist
                })
            }
        } catch (e) {
            reject(e);
        }
    })

}

let getRefreshTokenService = (refresh_Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('>>check refresh_Token: ', refresh_Token);
            if (!refresh_Token) {
                resolve({
                    errCode: 1,
                    errMessage: 'The refreshToken is not exist.'
                })
            }


            let isCheckRefreshToken = await isCheckExistRefreshToken(refresh_Token);

            if (isCheckRefreshToken.isCheckExist = false) {
                resolve({
                    errCode: 2,
                    errMessage: 'The refreshToken is not valid.'
                })
            }

            else {
                let response = {};
                jwt.verify(refresh_Token,
                    process.env.JWT_REFRESH_KEY,
                    (err, user) => {
                        if (err) {
                            response.errCode = 3;
                            response.errMessage = `Verify token process is failed, because: ${err}`;
                            return response;
                        }
                        else {
                            // refreshTokensDB = refreshTokensDB.filter((token) => token !== refresh_Token);
                            console.log('>> check user: ', user)
                            let newAccessToken = generateAccessToken(user);
                            let newRefreshToken = generateRefreshToken(user);

                            // insertRefreshTokenInDb(newRefreshToken);

                            response.errCode = 0;
                            response.errMessage = "getRefreshTokenService is sucessful";
                            response.accessToken = newAccessToken;
                            response.refreshToken = newRefreshToken;

                        }
                    })
                await insertRefreshTokenInDb(response.refreshToken);
                resolve(response);
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLoginService: handleLoginService,
    handleCreateNewUserService: handleCreateNewUserService,
    getRefreshTokenService: getRefreshTokenService,
}