import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);

    router.post("/api/login", userController.handleLogin);
    router.post("/api/create-new-user", userController.handleCreateNewUser);


    return app.use("/", router)
}

module.exports = initWebRouters;