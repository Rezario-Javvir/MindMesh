import type { Request, Response, NextFunction } from "express"
import { prisma } from "../../config/prisma.ts"
import chalk from "chalk"

export const check_user = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking User table..."))
    try {
        const user = await prisma.user.findMany()
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

export const check_profile = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Profile table..."))
    try {
        const profile = await prisma.profile.findMany({
            include: { user: true }
        })
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

export const check_article = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Blog table..."))
    try {
        const blog = await prisma.article.findMany({
            include: { user: true }
        })
        console.log(chalk.greenBright("Blog table check successful"))
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

export const check_category = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Category table..."))
    try {
        const category = await prisma.category.findMany({
            include: { blog: true }
        })
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

export const check_comment = async (req: Request, res: Response, next: NextFunction) => {
    console.log(chalk.blueBright("Checking Comment table..."))
    try {
        const comment = await prisma.comment.findMany()
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