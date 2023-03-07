import express from "express";
import authController from "../controllers/authController";

let router = express.Router();

router.post("/api/login", authController.handleLogin);
router.post("/api/create-new-user", authController.handleCreateNewUser);
router.post("/api/get-refresh-token", authController.getRefreshToken);

module.exports = router;