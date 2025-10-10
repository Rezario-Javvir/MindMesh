import * as bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import * as UserRepo from "../user.repo.ts"
import { ErrorOutput } from '../../../util/Output.ts'
import { prisma } from '../../../config/prisma.ts'

export const register = async (username: string, email: string, raw_password: string) => {
    const exist_user = await UserRepo.find_email_user(email)
    if(exist_user) {
        throw new ErrorOutput("Email already exists", 409)
    }

    const salt = 15
    const hashed_pass = await bcrypt.hash(raw_password, salt)

    const result = await prisma.user.create({
        data: {
            username,
            email,
            password: hashed_pass,
            profile: {
                create: {
                    fullname: null,
                    bio: "Hello, I'm new in MindMesh",
                    image: null
                }
            }
        },
        include: {
            profile: true
        }
    })

    const { password, ...userWithoutPass } = result
    return {
        user: userWithoutPass,
        profile: result.profile
    }
}

export const login = async (email: string, raw_password: string) => {
    const user = await UserRepo.find_email_user(email)
    if(!user) {
        throw new ErrorOutput("Account not found", 404)
    }

    const JWT_SECRET = process.env.JWT_SECRET_TOKEN

    const match_pass = await bcrypt.compare(raw_password, user.password)
    if(!match_pass) {
        throw new ErrorOutput("Invalid credentials", 401)
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET!, { expiresIn: '2d' })

    const { password, ...userWithoutPass } = user
    return { user: userWithoutPass, token: token }
}