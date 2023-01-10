import middlewareService from "../services/middlewareService";

let verifyToken = async (req, res, next) => {
    try {
        let token = req.body.accessToken;
        let responseFromMiddleware = await middlewareService.verifyTokenService(token);
        console.log('>> Check token: ', responseFromMiddleware)
        if (responseFromMiddleware.errCode === 0) {
            next();
            return;
        }

        return res.status(200).json({
            responseFromMiddleware
        })

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let middlewareController = {
    verifyToken: verifyToken,
}

module.exports = middlewareController;