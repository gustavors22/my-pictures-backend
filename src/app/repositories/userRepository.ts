import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const process = require("process");


interface User {
    name: string;
    email: string;
    password: string;
}

class UserRepository {
    public async create(user: User): Promise<User> {
        
        const saltRounds = process.env.SALT_ROUNDS;

        user.password = bcrypt.hashSync(user.password, parseInt(saltRounds));

        const userCreated = await prisma.user.create({
            data: user
        });

        return userCreated;
    }

    public async getByEmail(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
          })

        return user;
    }
        
}

export default new UserRepository();