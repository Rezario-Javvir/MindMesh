import type { Request, Response, NextFunction } from "express"
import chalk from "chalk"
import * as CommentService from "./comment_service.ts"
import { ErrorOutput } from "../../util/Output.ts"
import type { AuthRequest } from "../../middleware/auth.middleware.ts"

export const create_comment_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            throw new ErrorOutput("Authentication required: Please login to comment.", 401)
        }

        const user_id = req.user.id

        const { id } = req.params
        if(!id || isNaN(parseInt(id))) {
            console.log(chalk.redBright("Article ID is missing in the URL."))
            throw new ErrorOutput("Article ID is missing in the URL.", 400)
        }

        const { text } = req.body
        if(!text) {
            console.log(chalk.redBright("Comment text cannot be empty."))
            throw new ErrorOutput("Comment text cannot be empty.", 400)
        }

        console.log(chalk.blueBright("Creating new comment"))

        const parsed_article_id = parseInt(id as string)
        if(isNaN(parsed_article_id)) {
            console.log("Invalid Article ID format in URL.")
            throw new ErrorOutput("Invalid Article ID format in URL.", 400)
        }

        const comment_data = {
            text: text as string,
            user_id: user_id,
            article_id: parsed_article_id
        }

        const new_comment = await CommentService.create_comment_service(comment_data)

        console.log(chalk.greenBright("Comment create successfully."))

        res.status(201).json({
            status: "created",
            new_comment: new_comment
        })
    } 
    catch (error) {
        next(error)
    }
}

export const get_command_by_id_article_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Getting comments by article ID..."))
        const { id } = req.params
        if(!id || isNaN(parseInt(id))) {
            throw new ErrorOutput("Blog ID is missing", 400)
        }

        const get_article_id = parseInt(id)
        const comment = await CommentService.get_comment_by_article_id_service(get_article_id)
        res.json({
            status: "Got it",
            comment_count: comment.length,
            article_id: get_article_id,
            comment: comment
        })
    } 
    catch (error) {
        next(error)
    }
}