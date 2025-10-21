import type { Request, Response, NextFunction } from "express"
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

export const edit_profile_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(chalk.blueBright("Editing profile..."))
        
        const { id } = req.params
        if(!id || isNaN(parseInt(id))) {
            throw new Error("Profile ID is missing or invalid")
        }
        const { fullname, bio } = req.body
        const profile_id = parseInt(id)

        const updatedProfile = await ProfileService.edit_user_profile(profile_id, { fullname, bio })
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