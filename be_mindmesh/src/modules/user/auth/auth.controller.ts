import type { Request, Response, NextFunction } from "express"
import { ErrorOutput } from "../../../util/output.js"
import * as AuthService from "./auth.service.js"

export const controller_register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { username, email, password } = req.body
        if(!username || !email || !password) {
            throw new ErrorOutput("All fields are required", 400)
        }

        const result = await AuthService.register(username, email, password)

        res.status(200).json({
            status: "success",
            message: "Registered Successful",
            data: result
        })
    }
    catch(error) {
        next(error)
    }
}

export const controller_login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const result = await AuthService.login(email, password)
        if(!email || !password) {
            throw new ErrorOutput("All fields are required", 400)
        }

        res.status(200).json({
            status: "success",
            message: "Login Successful",
            data: result
        })
    } 
    catch (error) {
        next(error)
    }
}