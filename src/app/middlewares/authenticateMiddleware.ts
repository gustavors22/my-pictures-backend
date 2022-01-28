import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const process = require("process");

interface TokenPayload {
    id: number;
    iat: number;
    exp: number;
}

export default function authMiddleware( request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token not provided!",
        });
    }

    const token = authHeader.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id } = data as TokenPayload;

        request.userId = id;

        return next();
    } catch {
        return response.status(401).json({
            message: "Invalid token!",
        });
    }

}