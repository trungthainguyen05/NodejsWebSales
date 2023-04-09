import authService from "../services/authService";


let handleLogin = async (req, res) => {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;

    try {
        let userInfo = await authService.handleLoginService(inputEmail, inputPassword);
        if (userInfo.refreshToken) {
            // console.log('>>check vao add cookie')
            res.cookie("refreshToken", userInfo.refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
        }

        // delete userInfo.refreshToken

        return res.status(200).json(userInfo)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let handleCreateNewUser = async (req, res) => {
    try {
        let message = await authService.handleCreateNewUserService(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getRefreshToken = async (req, res) => {
    try {
        // console.log(req.cookies.refreshToken);
        let refresh_Token = req.cookies.refreshToken;
        let message = await authService.getRefreshTokenService(refresh_Token);
        if (!message || !message.refreshToken) {
            return res.status(200).json({
                errCode: -2,
                errMessage: message,
            });
        }
        else {
            res.cookie("refreshToken", message.refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            return res.status(200).json(message);
        }
        return res.status(200).json("OK");

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
    getRefreshToken: getRefreshToken,
}