import { Router } from "express";
import userController from "../app/controllers/userController";

export const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});

routes.post("/user", userController.store);

export default routes;