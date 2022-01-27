import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const process = require("process");

class UserController {
    public async store(request: Request, response: Response) {
        let { name, email, password } = request.body;

        const saltRounds = process.env.SALT_ROUNDS;
        
        password = bcrypt.hashSync(password, parseInt(saltRounds));

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return response.json(user);
    }

}

export default new UserController();