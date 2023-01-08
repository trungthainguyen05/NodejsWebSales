import express from "express";
import userRoute from "./userRoute";
import auth from "./auth";

let router = express.Router();

let initWebRouters = (app) => {
    // router.get("/", homeController.getHomePage);

    app.use("/v1", auth);
    app.use("/v1", userRoute);

    return app.use(router);
}

module.exports = initWebRouters;