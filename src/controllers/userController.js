import userService from "../services/userService";

let handleGetAllUser = async (req, res) => {
    try {
        let userList = await userService.handleGetAllUser(req.body.limit);
        return res.status(200).json(userList);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetAllUserByPaging = async (req, res) => {
    try {
        let userList = await userService.handleGetAllUserByPaging(req.body.offset, req.body.limit);
        return res.status(200).json(userList);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        let result = await userService.handleDeleteUserService(req.body.id);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleGetAllcodes = async (req, res) => {
    try {
        let result = await userService.handleGetAllcodesService(req.query.type);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleGetAllUser: handleGetAllUser,
    handleGetAllUserByPaging: handleGetAllUserByPaging,
    handleDeleteUser: handleDeleteUser,
    handleGetAllcodes: handleGetAllcodes,
}