import express from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";

let router = express.Router();

// middlewareController.verifyToken,
router.get('/api/get-all-user', middlewareController.verifyToken, userController.handleGetAllUser);
router.get('/api/get-all-user-by-paging', userController.handleGetAllUserByPaging);
router.delete('/api/delete-user', userController.handleDeleteUser);
router.get('/api/get-allcodes', userController.handleGetAllcodes);


module.exports = router;