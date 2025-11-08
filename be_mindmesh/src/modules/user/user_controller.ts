import type { Request, Response, NextFunction } from "express"
import * as UserService from "./user_service"
// import { ErrorOutput } from "../../util/Output.ts"
import chalk from "chalk"

// export const find_user_name = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log(chalk.blueBright("Searching user by name..."))
//         const { q } =req.query
//         if(!q || typeof q !== 'string' || q.trim().length < 1) {
//             throw new ErrorOutput('Search query is missing', 404)
//         }

//         const partial_name = q.trim()

//         const user = await UserService.find_name(partial_name)

//         console.log(chalk.greenBright("User search successful"))
//         res.status(200).json({
//             status: "success",
//             data: user
//         })
//     }
//     catch (error) {
//         next(error)
//     }
// }

export const all_user_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching all users..."))

        const user = await UserService.find_all_user_service()

        console.log(chalk.greenBright("Fetched all users successfully"))
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