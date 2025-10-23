import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../middleware/auth.middleware.ts"
import { ErrorOutput } from "../../util/Output.ts"
import * as ProfileService from "./profile_service.ts"
import chalk from "chalk"

export const get_profile_id_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching profile by ID..."))
        
        if(!req.params.id || isNaN(parseInt(req.params.id))) {
            throw new Error("Profile ID is missing or invalid")
        }
        const id = parseInt(req.params.id)
        const profile = await ProfileService.find_profile(id)
        
        console.log(chalk.greenBright("Profile fetch successful"))
        res.status(200).json({
            status: "success",
            data: profile
        })
    }
    catch (error) {
        next(error)
    }
}

export const edit_profile_controller = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            throw new ErrorOutput("Authentication required: User ID missing from token.", 401)
        }

        console.log(chalk.blueBright("Editing profile..."))
        
        const { fullname, bio, avatar } = req.body
        const user_id = req.user.id 

        const updatedProfile = await ProfileService.edit_user_profile(user_id, { fullname, bio, avatar })
        console.log(chalk.greenBright("Profile edit successful"))
        res.status(200).json({
            status: "success",
            data: updatedProfile
        })
    } 
    catch (error) {
        next(error)
    }
}