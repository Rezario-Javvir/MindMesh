import type { Request, Response, NextFunction } from "express"
import * as ArticleService from "../article/article_service.ts"
import { ErrorOutput } from "../../util/Output.ts"
import type { AuthRequest } from "../../middleware/auth.middleware.ts"
import chalk from "chalk"

export const create_article_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            throw new ErrorOutput("Authentication required: User ID missing from token.", 401)
        }

        console.log(chalk.blueBright("Creating new article post..."))

        const { title, content, category_id } = req.body
        const user_id = req.user.id
        const file = req.file
        if (!file) {
            throw new ErrorOutput("Image must be filled", 400)
        }
        const image = file.filename

        //convert to Int
        const parsed_category_id = parseInt(category_id as string)

        const new_blog = await ArticleService.create_article_service(
            title, 
            content, 
            image, 
            user_id, 
            parsed_category_id
        )
        console.log(chalk.greenBright("Blog post created successfully"))
        res.status(201).json({
            status: "success",
            article: new_blog
        })
    }
    catch (error) {
        next(error)
    }
}

export const search_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Searching blog posts..."))
        const { article } = req.query
        if(!article || typeof article !== "string") {
            throw new ErrorOutput("Title query parameter is missing or invalid", 400)
        }

        const partial_title = article.trim()
        const blog = await ArticleService.search_article_service(partial_title)

        console.log(chalk.greenBright("Blog post search successful"))
        res.status(200).json({
            status: "success",
            results: blog.length,
            articles: blog
        })
    } 
    catch (error) {
        next(error)
    }
}

export const get_all_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching all blog posts..."))
        const blogs = await ArticleService.find_all_article_service()
        console.log(chalk.greenBright("All blog posts fetched successfully"))
        res.status(200).json({
            status: "success",
            articles: blogs
        })
    } 
    catch (error) {
        next(error)
    }
}

export const edit_article_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Editing blog post..."))
        const { id } = req.params
        if(!id || isNaN(parseInt(id))) {
            throw new ErrorOutput("Blog ID is missing", 400)
        }

        if(!req.user) {
            console.log(chalk.redBright("You have not authorized yet. Please login first"))
            return res.status(403).json({ message: "Forbidden: Only registered user can access this endpoint" })
        }

        const { title, content } = req.body
        const blog_id = parseInt(id)
        const updatedBlog = await ArticleService.edit_article_service(blog_id, { title, content })

        console.log(chalk.greenBright("Blog post edit successful"))
        res.status(200).json({
            status: "success",
            articles: updatedBlog
        })
    } 
    catch (error) {
        next(error)
    }
}