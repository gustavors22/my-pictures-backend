import { Request, Response } from "express";
import userRepository from "../repositories/userRepository";

class UserController {
    public async store(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const user = await userRepository.create({ name, email, password });

        return response.json(user);
    }

    public async index(request: Request, response: Response) {
        return response.json({
            message: "Login success!"
        });
    }

}

export default new UserController();