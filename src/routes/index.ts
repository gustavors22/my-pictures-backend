import { Router } from "express";

import authMiddleware from "../app/middlewares/authenticateMiddleware";

import authController from "../app/controllers/authController";
import userController from "../app/controllers/userController";
import ImageController from "../app/controllers/ImageController";


export const router = Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
});


router.post('/auth', authController.authenticate);

router.post("/user", userController.store);

router.post("/image", authMiddleware, ImageController.store);
router.get("/image/:id", authMiddleware, ImageController.show);
router.delete("/image/:id", authMiddleware, ImageController.delete);
router.get("/images/user/:id", authMiddleware, ImageController.index);

export default router;