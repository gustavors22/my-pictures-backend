import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";

import bcrypy from "bcryptjs";
import jwt from "jsonwebtoken";

const process = require("process");

class AuthController {
    public async authenticate(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const user = await userRepository.getByEmail(email);

        if (!user) {
            return response.status(401).json({
                message: "User not found!",
            });
        }

        const isPasswordValid = bcrypy.compareSync(password, user.password);

        if(!isPasswordValid){
            return response.status(401).json({
                message: "Invalid password!",
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        return response.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }

}

export default new AuthController();