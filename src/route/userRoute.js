import express from "express";
import userController from "../controllers/userController";

let router = express.Router();


router.get('/api/get-all-user', userController.handleGetAllUser);
router.get('/api/get-all-user-by-paging', userController.handleGetAllUserByPaging);
router.delete('/api/delete-user', userController.handleDeleteUser);




module.exports = router;