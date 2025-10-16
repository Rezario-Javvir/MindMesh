import type { Request, Response, NextFunction } from "express"
import { ErrorOutput } from "../util/Output.ts"
import * as AuthService from "./auth.service.ts"
import chalk from "chalk"

export const controller_register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(chalk.blueBright("Registering user..."))
        const { username, email, password } = req.body
        if(!username || !email || !password) {
            throw new ErrorOutput("All fields are required", 400)
        }

        const result = await AuthService.register(username, email, password)

        console.log(chalk.greenBright("User registered successfully"))
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
        console.log(chalk.blueBright("Logging in user..."))

        const { email, password } = req.body
        const result = await AuthService.login(email, password)
        if(!email || !password) {
            throw new ErrorOutput("All fields are required", 400)
        }

        console.log(chalk.greenBright("User logged in successfully"))
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

export const controller_forgot_password = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.greenBright("Processing forgot password request..."))

        const { email } = req.body
        if(!email) {
            throw new ErrorOutput("Email is required", 400)
        }

        await AuthService.forgot_password(email)

        console.log(chalk.greenBright("Forgot password request processed"))
        res.status(200).json({
            status: "success",
            message: "If the email is registered, a password reset link has been sent."
        })
    } 
    catch (error) {
        next(error)
    }
}

export const controller_reset_password = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Resetting password..."))

        const { token } = req.query
        const { new_password } = req.body
        if(!new_password) {
            throw new ErrorOutput("All fields are required", 400)
        }

        const result = await AuthService.reset_password(token as string, new_password)

        console.log(chalk.greenBright("Password reset successfully"))
        res.status(200).json({
            status: "success",
            message: result.message
        })
    } 
    catch (error) {
        next(error)
    }
}