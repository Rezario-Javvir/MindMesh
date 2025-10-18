import type { Request, Response, NextFunction } from "express"
import * as BlogService from "./article.service.ts"
import { ErrorOutput } from "../../util/Output.ts"
import chalk from "chalk"

export const create_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Creating new blog post..."))
        const { title, content, user_id, category_id } = req.body

        const newBlog = await BlogService.create_article(title, content, user_id, category_id)
        console.log(chalk.greenBright("Blog post creation successful"))
        res.status(201).json({
            status: "success",
            article: newBlog
        })
    }
    catch (error) {
        next(error)
    }
}

export const search_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Searching blog posts..."))
        const { title } = req.query
        if(!title || typeof title !== "string") {
            throw new ErrorOutput("Title query parameter is missing or invalid", 400)
        }

        const partial_title = title.trim()
        const blog = await BlogService.search_article(partial_title)

        console.log(chalk.greenBright("Blog post search successful"))
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

export const get_all_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching all blog posts..."))
        const blogs = await BlogService.find_all_article()
        console.log(chalk.greenBright("All blog posts fetch successful"))
        res.status(200).json({
            status: "success",
            data: blogs
        })
    } 
    catch (error) {
        next(error)
    }
}

export const edit_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Editing blog post..."))
        const { id } = req.params
        if(!id || isNaN(parseInt(id))) {
            throw new ErrorOutput("Blog ID is missing", 400)
        }

        const { title, content } = req.body
        const blog_id = parseInt(id)
        const updatedBlog = await BlogService.edit_article(blog_id, { title, content })

        console.log(chalk.greenBright("Blog post edit successful"))
        res.status(200).json({
            status: "success",
            data: updatedBlog
        })
    } 
    catch (error) {
        next(error)
    }
}