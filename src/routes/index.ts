import { Router } from "express";

import authMiddleware from "../app/middlewares/authenticateMiddleware";

import authController from "../app/controllers/authController";
import userController from "../app/controllers/userController";


export const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});


router.post('/auth', authController.authenticate);

router.post("/user", userController.store);

router.get("/user", authMiddleware, userController.index);


export default router;