import type { Request, Response, NextFunction } from "express"
import * as CategoryService from "./category.service.ts"
import chalk from "chalk"

export const add_category_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Adding categories..."))
        const newCategory = await CategoryService.category_create_service()
        console.log(chalk.greenBright("Category addition successful"))
        res.status(201).json({
            status: "success",
            data: newCategory
        })
    }
    catch (error) {
        next(error)
    }
}

export const get_categories_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching categories..."))
        const categories = await CategoryService.get_categories_service()
        console.log(chalk.greenBright("Categogry fetched successfully."))
        res.status(200).json({
            status: "success",
            results: categories.length,
            data: categories
        })
    } 
    catch (error) {
        next(error)
    }
}