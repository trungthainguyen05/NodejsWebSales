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
                    resolve({
                        errCode: 0,
                        errMessage: 'The login is succesful',
                        user: userData
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

module.exports = {
    handleLoginService: handleLoginService,
    handleCreateNewUserService: handleCreateNewUserService,
}