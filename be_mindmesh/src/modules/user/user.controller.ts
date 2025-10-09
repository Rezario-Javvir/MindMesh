import type { Request, Response, NextFunction } from "express"
import * as UserService from "./user.service.js"
import { ErrorOutput } from "../../util/output.js"

export const find_user_name = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } =req.query
        if(!username) {
            throw new ErrorOutput('Search query is missing', 404)
        }

        const names = username as string
        const user = await UserService.find_name(names)

        res.status(200).json({
            status: "success",
            data: user
        })
    } 
    catch (error) {
        next(error)
    }
}