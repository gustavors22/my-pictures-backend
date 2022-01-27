import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserController {
    public async store(request: Request, response: Response) {
        const { name, email, password } = request.body;
        
        const newPassword = await bcrypt.hash(password, env("SALT_ROUNDS"));
        
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