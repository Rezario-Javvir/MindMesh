import type { Request, Response, NextFunction } from "express"
import * as CheckService from "./check_db.service.ts"
import chalk from "chalk"


export const check_user_controller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking User table..."))
    try {
        const user = await CheckService.check_user_service()
        console.log(chalk.greenBright("User table check successful"))
        res.status(200).json({
            status: "success",
            results: user.length,
            data: user
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_profile_controller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Profile table..."))
    try {
        const profile = await CheckService.check_profile_service()
        console.log(chalk.greenBright("Profile table check successful"))
        res.status(200).json({
            status: "success",
            results: profile.length,
            data: profile
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Blog table..."))
    try {
        const blog = await CheckService.check_article_service()
        console.log(chalk.greenBright("Article table check successful"))
        res.status(200).json({
            status: "success",
            results: blog.length,
            data: blog
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_category_controller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Category table..."))
    try {
        const category = await CheckService.check_category_service()
        console.log(chalk.greenBright("Category table check successful"))
        res.status(200).json({
            status: "success",
            results: category.length,
            data: category
        })
    } 
    catch (error) {
        next(error)
    }
}

export const check_comment_controller = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Comment table..."))
    try {
        const comment = await CheckService.check_comment_service()
        console.log(chalk.greenBright("Comment table check successful"))
        res.status(200).json({
            status: "success",
            results: comment.length,
            data: comment
        })
    } 
    catch (error) {
        next(error)
    }
}