import userService from "../services/userService";

let handleLogin = async (req, res) => {
    //Validate input
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;

    if (!inputEmail || !inputPassword) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameters',
        })
    }

    try {
        let userInfo = await userService.handleLoginService(inputEmail, inputPassword);
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
        let message = await userService.handleCreateNewUserService(req.body);
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