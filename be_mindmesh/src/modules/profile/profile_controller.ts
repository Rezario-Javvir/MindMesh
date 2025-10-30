import type { Request, Response, NextFunction } from "express"
import type { AuthRequest } from "../../middleware/auth.middleware.ts"
import { ErrorOutput } from "../../util/Output.ts"
import * as ProfileService from "./profile_service.ts"
import chalk from "chalk"

export const my_profile_repo = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            throw new ErrorOutput("Authentication required: User ID missing from token.", 401)
        }

        const user_id = req.user?.id

        console.log(chalk.blueBright("Fetching my profile..."))

        const my_profile = await ProfileService.my_profile_service(user_id)

        console.log(chalk.greenBright("My profile fetched successfully"))
        res.status(200).json({
            status: "success",
            data: my_profile
        })
    }
    catch (error) {
        next(error)
    }
}

export const get_profile_id_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Fetching profile by ID..."))
        
        if(!req.params.id || isNaN(parseInt(req.params.id))) {
            throw new Error("Profile ID is missing or invalid")
        }
        const id = parseInt(req.params.id)
        const profile = await ProfileService.find_profile(id)
        
        console.log(chalk.greenBright("Profile fetched successfully"))
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
        
        const { username, bio } = req.body
        const user_id = req.user.id 

        const file = (req.file as Express.Multer.File)?.filename
        const updated_data: { username?: string, bio?: string, avatar?: string } = { username, bio }
        
        if (file) {
            updated_data.avatar = file;
            console.log("console.log('Avatar uploaded:', avatarFileName);")
        }

        const updatedProfile = await ProfileService.edit_user_profile(user_id, updated_data)
        console.log(chalk.greenBright("Profile edit successfully"))
        res.status(200).json({
            status: "success",
            data: updatedProfile
        })
    } 
    catch (error) {
        next(error)
    }
}