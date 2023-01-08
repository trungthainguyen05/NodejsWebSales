import authService from "../services/authService";

let handleLogin = async (req, res) => {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;

    try {
        let userInfo = await authService.handleLoginService(inputEmail, inputPassword);
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


module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
}