import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { ErrorOutput } from "../util/Output.ts"
import chalk from "chalk"

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
    }
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token) {
        console.log(chalk.red("Access Denied: No token"));
        return next(new ErrorOutput("Access Denied. No token provided.", 401));
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET_TOKEN as string
        if (!JWT_SECRET) {
            throw new Error("Server configuration error: JWT_SECRET_TOKEN is not set.")
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number, email: string }

        req.user = {
            id: decoded.id,
            email: decoded.email
        }
        next()
    }
    catch (error) {
        console.log(chalk.red("console.log('Access Denied: Invalid token');"));
        return next(new ErrorOutput("Access Denied. Invalid or expired token.", 401));
    }
}