import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let verifyTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing token parameter.'
                })
            } else {
                let accessToken = token.split(" ")[1];
                let response = {};
                jwt.verify(
                    accessToken,
                    process.env.JWT_ACCESS_KEY,
                    (err, user) => {
                        if (err) {
                            response.errCode = 10;
                            response.errMessage = 'Your token is expire';
                            return response;
                        }
                        else {
                            response.errCode = 0;
                            response.errMessage = user;
                            return response;
                        }
                    }
                )
                // console.log('>> tr check JWT: ', response);
                resolve(response);

            }
            resolve({
                errCode: 2,
                errMessage: 'Your token is not valid',
            })

        } catch (e) {
            reject(e);
        }
    })
}

let middlewareService = {
    verifyTokenService: verifyTokenService,
}

module.exports = middlewareService;